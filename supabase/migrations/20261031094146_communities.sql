create table public.communities (
    slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    name text not null check (char_length(name) between 2 and 60),
    site_url text check (site_url ~ '^https?://[^/\s]+$'),
    booking_prefix text not null unique check (booking_prefix ~ '^[A-Z]{2,4}$'),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create trigger communities_set_updated_at before update on public.communities
for each row execute function public.set_updated_at();

insert into public.communities (slug, name, site_url, booking_prefix) values
    ('echoverse', 'Echoverse Hub', 'https://echoversehub.com', 'ECH'),
    ('founders-frame', 'Founders Frame', null, 'FF');

alter table public.communities enable row level security;

create policy "Communities are public" on public.communities
for select to anon, authenticated
using (true);

create policy "Super admins update communities" on public.communities
for update to authenticated
using ((select public.has_staff_role('super_admin')))
with check ((select public.has_staff_role('super_admin')));

revoke insert, delete on public.communities from anon, authenticated;
revoke update on public.communities from anon;

alter table public.events
    add column community text references public.communities (slug) on update cascade on delete restrict;
update public.events set community = 'echoverse';
alter table public.events alter column community set not null;
create index events_community_status_starts_at_idx on public.events (community, status, starts_at);

alter table public.promo_codes
    add column community text references public.communities (slug) on update cascade on delete cascade;
update public.promo_codes p
set community = coalesce((select e.community from public.events e where e.id = p.event_id), 'echoverse');
alter table public.promo_codes
    alter column community set not null,
    drop constraint promo_codes_code_key,
    add constraint promo_codes_community_code_key unique (community, code);

alter table public.page_visits
    add column community text references public.communities (slug) on update cascade on delete cascade;
update public.page_visits set community = 'echoverse';
alter table public.page_visits alter column community set not null;
create index page_visits_community_idx on public.page_visits (community, created_at desc);

create table public.customer_consents (
    customer_id uuid not null references public.customers (id) on delete cascade,
    community text not null references public.communities (slug) on update cascade on delete cascade,
    marketing_consent boolean not null,
    updated_at timestamptz not null default now(),
    primary key (customer_id, community)
);

alter table public.customer_consents enable row level security;

create policy "Reporting staff see marketing consent" on public.customer_consents
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')));

revoke insert, update, delete on public.customer_consents from anon, authenticated;

insert into public.customer_consents (customer_id, community, marketing_consent, updated_at)
select id, 'echoverse', marketing_consent, coalesce(consent_updated_at, updated_at)
from public.customers;

drop function public.community_stats();
drop function public.community_members();
drop function public.upsert_customer(text, text, text, text, boolean);
drop function public.generate_booking_code(text, timestamptz);
drop function public.track_visit(text, text, uuid, jsonb, text);
drop function public.event_summaries();
drop function public.promo_code_summaries();
drop function public.dashboard_stats(uuid);

alter table public.customers
    drop column marketing_consent,
    drop column consent_updated_at;

create function public.upsert_customer(p_name text, p_email text, p_phone text, p_city text)
returns uuid
language sql
security definer
set search_path = ''
as $$
    insert into public.customers (email, name, phone, city)
    values (lower(trim(p_email)), trim(p_name), trim(p_phone), nullif(trim(coalesce(p_city, '')), ''))
    on conflict (email) do update set
        name = excluded.name,
        phone = excluded.phone,
        city = coalesce(excluded.city, public.customers.city)
    returning id
$$;

create function public.record_marketing_consent(p_customer_id uuid, p_community text, p_consent boolean)
returns void
language sql
security definer
set search_path = ''
as $$
    insert into public.customer_consents (customer_id, community, marketing_consent)
    values (p_customer_id, p_community, coalesce(p_consent, false))
    on conflict (customer_id, community) do update set
        marketing_consent = excluded.marketing_consent,
        updated_at = now()
$$;

create function public.generate_booking_code(p_event_id uuid) returns text
language plpgsql
set search_path = ''
as $$
declare
    v_prefix text;
    v_code text;
begin
    select c.booking_prefix || '-' || e.city_code || '-' || to_char(e.starts_at at time zone 'Asia/Kolkata', 'YYMMDD') || '-'
    into v_prefix
    from public.events e
    join public.communities c on c.slug = e.community
    where e.id = p_event_id;

    loop
        v_code := v_prefix || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 5));
        exit when not exists (select 1 from public.orders where booking_code = v_code);
    end loop;
    return v_code;
end;
$$;

create or replace function public.apply_promo(p_event_id uuid, p_code text, p_subtotal integer, p_lock boolean default false)
returns table (promo_id uuid, promo_code text, discount_amount integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_community text;
    v_promo public.promo_codes;
begin
    select community into v_community from public.events where id = p_event_id;

    if p_lock then
        select * into v_promo from public.promo_codes p
        where p.community = v_community and p.code = upper(trim(p_code))
        for update;
    else
        select * into v_promo from public.promo_codes p
        where p.community = v_community and p.code = upper(trim(p_code));
    end if;

    if not found
        or not v_promo.active
        or (v_promo.event_id is not null and v_promo.event_id <> p_event_id)
        or (v_promo.starts_at is not null and v_promo.starts_at > now())
        or (v_promo.expires_at is not null and v_promo.expires_at < now()) then
        raise exception 'promo_invalid';
    end if;

    if v_promo.max_uses is not null and public.promo_code_uses(v_promo.id) >= v_promo.max_uses then
        raise exception 'promo_exhausted';
    end if;

    return query select
        v_promo.id,
        v_promo.code,
        case
            when v_promo.discount_type = 'percent' then (greatest(p_subtotal, 0) * v_promo.discount_value / 100)
            else least(v_promo.discount_value, greatest(p_subtotal, 0))
        end;
end;
$$;

create or replace function public.reserve_order(
    p_event_id uuid,
    p_items jsonb,
    p_name text,
    p_email text,
    p_phone text,
    p_answers jsonb default '{}'::jsonb,
    p_promo_code text default null,
    p_marketing_consent boolean default false,
    p_utm jsonb default '{}'::jsonb,
    p_hold_minutes integer default 15
) returns public.orders
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_event public.events;
    v_type public.ticket_types;
    v_item record;
    v_question jsonb;
    v_answers jsonb := coalesce(p_answers, '{}'::jsonb);
    v_subtotal integer := 0;
    v_discount integer := 0;
    v_promo_id uuid;
    v_people integer := 0;
    v_order public.orders;
begin
    perform public.expire_stale_orders();

    select * into v_event from public.events where id = p_event_id;
    if not found or v_event.status <> 'published' or v_event.ends_at < now() then
        raise exception 'event_unavailable';
    end if;
    if v_event.sales_paused then
        raise exception 'sales_paused';
    end if;

    perform public.validate_buyer(p_name, p_email, p_phone);
    perform public.assert_hold_allowed(p_email);

    if jsonb_typeof(p_items) is distinct from 'array' or jsonb_array_length(p_items) = 0 then
        raise exception 'invalid_items';
    end if;
    if jsonb_typeof(v_answers) <> 'object' then
        raise exception 'invalid_answers';
    end if;

    for v_question in select value from jsonb_array_elements(v_event.questions) loop
        if coalesce((v_question ->> 'required')::boolean, false)
            and coalesce(trim(v_answers ->> (v_question ->> 'id')), '') = '' then
            raise exception 'answers_missing';
        end if;
    end loop;

    for v_item in
        select (item ->> 'ticket_type_id')::uuid as ticket_type_id, sum((item ->> 'quantity')::integer)::integer as quantity
        from jsonb_array_elements(p_items) item
        group by 1
        order by 1
    loop
        select * into v_type from public.ticket_types
        where id = v_item.ticket_type_id and event_id = p_event_id
        for update;

        if not found
            or not v_type.visible
            or v_type.sold_out
            or (v_type.sales_start is not null and v_type.sales_start > now())
            or (v_type.sales_end is not null and v_type.sales_end < now()) then
            raise exception 'ticket_unavailable';
        end if;
        if v_item.quantity < v_type.min_per_order or v_item.quantity > v_type.max_per_order then
            raise exception 'quantity_limit';
        end if;
        if public.ticket_type_remaining(v_type.id) < v_item.quantity then
            raise exception 'sold_out';
        end if;

        v_subtotal := v_subtotal + v_type.price * v_item.quantity;
        v_people := v_people + v_item.quantity * v_type.admits;
    end loop;

    if v_people > 20 then
        raise exception 'quantity_limit';
    end if;

    if nullif(trim(coalesce(p_promo_code, '')), '') is not null then
        select promo_id, discount_amount into v_promo_id, v_discount
        from public.apply_promo(p_event_id, p_promo_code, v_subtotal, true);
    end if;

    insert into public.orders (
        booking_code, event_id, customer_id, name, email, phone, answers,
        subtotal, discount, total, promo_code_id, hold_expires_at,
        utm_source, utm_medium, utm_campaign, referrer, terms_accepted_at
    ) values (
        public.generate_booking_code(p_event_id),
        p_event_id,
        public.upsert_customer(p_name, p_email, p_phone, v_answers ->> 'city'),
        trim(p_name),
        lower(trim(p_email)),
        trim(p_phone),
        v_answers,
        v_subtotal,
        v_discount,
        v_subtotal - v_discount,
        v_promo_id,
        now() + make_interval(mins => p_hold_minutes),
        left(p_utm ->> 'source', 100),
        left(p_utm ->> 'medium', 100),
        left(p_utm ->> 'campaign', 100),
        left(p_utm ->> 'referrer', 300),
        now()
    ) returning * into v_order;

    perform public.record_marketing_consent(v_order.customer_id, v_event.community, p_marketing_consent);

    insert into public.order_items (order_id, ticket_type_id, quantity, unit_price, admits)
    select v_order.id, tt.id, i.quantity, tt.price, tt.admits
    from (
        select (item ->> 'ticket_type_id')::uuid as ticket_type_id, sum((item ->> 'quantity')::integer)::integer as quantity
        from jsonb_array_elements(p_items) item
        group by 1
    ) i
    join public.ticket_types tt on tt.id = i.ticket_type_id;

    return v_order;
end;
$$;

create or replace function public.issue_complimentary(
    p_event_id uuid,
    p_ticket_type_id uuid,
    p_quantity integer,
    p_name text,
    p_email text,
    p_phone text,
    p_note text default ''
) returns public.orders
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_event public.events;
    v_type public.ticket_types;
    v_order public.orders;
begin
    if not public.has_staff_role('super_admin', 'event_manager') then
        raise exception 'not_allowed';
    end if;

    select * into v_event from public.events where id = p_event_id;
    if not found then
        raise exception 'event_unavailable';
    end if;

    select * into v_type from public.ticket_types where id = p_ticket_type_id and event_id = p_event_id for update;
    if not found then
        raise exception 'ticket_unavailable';
    end if;
    if p_quantity not between 1 and 20 then
        raise exception 'quantity_limit';
    end if;
    if public.ticket_type_remaining(v_type.id) < p_quantity then
        raise exception 'sold_out';
    end if;

    perform public.validate_buyer(p_name, p_email, p_phone);

    insert into public.orders (
        booking_code, event_id, customer_id, name, email, phone,
        subtotal, discount, total, status, source, payment_provider, paid_at, notes
    ) values (
        public.generate_booking_code(p_event_id),
        p_event_id,
        public.upsert_customer(p_name, p_email, p_phone, null),
        trim(p_name),
        lower(trim(p_email)),
        trim(p_phone),
        0, 0, 0, 'paid', 'complimentary', 'complimentary', now(),
        coalesce(trim(p_note), '')
    ) returning * into v_order;

    insert into public.order_items (order_id, ticket_type_id, quantity, unit_price, admits)
    values (v_order.id, v_type.id, p_quantity, 0, v_type.admits);

    perform public.issue_tickets(v_order.id);

    insert into public.activity_log (actor_id, actor_email, action, entity, entity_id, changes)
    values (auth.uid(), public.current_email(), 'complimentary', 'orders', v_order.id::text,
        jsonb_build_object('booking_code', v_order.booking_code, 'ticket_type', v_type.name, 'quantity', p_quantity, 'email', v_order.email));

    return v_order;
end;
$$;

create or replace function public.duplicate_event(p_event_id uuid) returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_new_id uuid;
begin
    if not public.has_staff_role('super_admin', 'event_manager') then
        raise exception 'not_allowed';
    end if;

    insert into public.events (
        community, slug, title, category, tag, tone, summary, description,
        cover_url, cover_alt, cover_credit, cover_source,
        starts_at, ends_at, city, city_code, region, venue_name, venue_address, map_url,
        venue_lat, venue_lng,
        highlights, schedule, hosts, age_limit, language, dress_code,
        included, not_included, things_to_know, faqs, terms, refund_policy, questions, status
    )
    select
        community,
        left(slug, 60) || '-copy-' || substr(encode(extensions.gen_random_bytes(3), 'hex'), 1, 4),
        left(title || ' (copy)', 80),
        category, tag, tone, summary, description,
        cover_url, cover_alt, cover_credit, cover_source,
        starts_at, ends_at, city, city_code, region, venue_name, venue_address, map_url,
        venue_lat, venue_lng,
        highlights, schedule, hosts, age_limit, language, dress_code,
        included, not_included, things_to_know, faqs, terms, refund_policy, questions, 'draft'
    from public.events
    where id = p_event_id
    returning id into v_new_id;

    if v_new_id is null then
        raise exception 'event_unavailable';
    end if;

    insert into public.ticket_types (
        event_id, name, description, price, quantity, admits,
        min_per_order, max_per_order, sales_start, sales_end, visible, sold_out, sort_order
    )
    select
        v_new_id, name, description, price, quantity, admits,
        min_per_order, max_per_order, sales_start, sales_end, visible, false, sort_order
    from public.ticket_types
    where event_id = p_event_id;

    return v_new_id;
end;
$$;

create or replace function public.get_booking(p_access_token uuid) returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select jsonb_build_object(
        'community', jsonb_build_object(
            'slug', c.slug,
            'name', c.name,
            'site_url', c.site_url
        ),
        'order', jsonb_build_object(
            'id', o.id,
            'booking_code', o.booking_code,
            'status', o.status,
            'source', o.source,
            'name', o.name,
            'email', o.email,
            'phone', o.phone,
            'subtotal', o.subtotal,
            'discount', o.discount,
            'total', o.total,
            'needs_refund', o.needs_refund,
            'hold_expires_at', o.hold_expires_at,
            'paid_at', o.paid_at,
            'created_at', o.created_at
        ),
        'event', jsonb_build_object(
            'id', e.id,
            'slug', e.slug,
            'title', e.title,
            'category', e.category,
            'tone', e.tone,
            'starts_at', e.starts_at,
            'ends_at', e.ends_at,
            'city', e.city,
            'venue_name', e.venue_name,
            'venue_address', e.venue_address,
            'venue_lat', e.venue_lat,
            'venue_lng', e.venue_lng,
            'map_url', e.map_url,
            'cover_url', e.cover_url,
            'cover_alt', e.cover_alt,
            'dress_code', e.dress_code,
            'things_to_know', to_jsonb(e.things_to_know)
        ),
        'items', coalesce((
            select jsonb_agg(jsonb_build_object(
                'name', tt.name,
                'quantity', oi.quantity,
                'unit_price', oi.unit_price,
                'admits', oi.admits
            ) order by tt.sort_order, tt.name)
            from public.order_items oi
            join public.ticket_types tt on tt.id = oi.ticket_type_id
            where oi.order_id = o.id
        ), '[]'::jsonb),
        'tickets', case when o.status = 'paid' then coalesce((
            select jsonb_agg(jsonb_build_object(
                'code', t.code,
                'qr_token', t.qr_token,
                'status', t.status,
                'checked_in_at', t.checked_in_at,
                'ticket_type', tt.name
            ) order by char_length(t.code), t.code)
            from public.tickets t
            join public.ticket_types tt on tt.id = t.ticket_type_id
            where t.order_id = o.id
        ), '[]'::jsonb) else '[]'::jsonb end
    )
    from public.orders o
    join public.events e on e.id = o.event_id
    join public.communities c on c.slug = e.community
    where o.access_token = p_access_token
$$;

create function public.track_visit(
    p_community text,
    p_path text,
    p_visitor_id text,
    p_event_id uuid default null,
    p_utm jsonb default '{}'::jsonb,
    p_referrer text default null
) returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
    if char_length(coalesce(p_visitor_id, '')) not between 8 and 64
        or char_length(coalesce(p_path, '')) not between 1 and 200
        or not exists (select 1 from public.communities where slug = p_community) then
        return;
    end if;
    if exists (
        select 1 from public.page_visits
        where community = p_community and visitor_id = p_visitor_id and path = p_path
            and created_at > now() - interval '30 minutes'
    ) then
        return;
    end if;

    insert into public.page_visits (community, event_id, path, visitor_id, utm_source, utm_medium, utm_campaign, referrer)
    values (
        p_community,
        (select id from public.events where id = p_event_id and status = 'published' and community = p_community),
        p_path,
        p_visitor_id,
        left(p_utm ->> 'source', 100),
        left(p_utm ->> 'medium', 100),
        left(p_utm ->> 'campaign', 100),
        left(p_referrer, 300)
    );
end;
$$;

create function public.event_summaries(p_community text)
returns table (
    event_id uuid,
    tickets_sold integer,
    checked_in integer,
    gross_sales integer,
    capacity integer,
    remaining integer
)
language sql
stable
security definer
set search_path = ''
as $$
    select
        e.id,
        (select count(*)::integer from public.tickets t join public.orders o on o.id = t.order_id
            where t.event_id = e.id and o.status = 'paid' and t.status = 'valid'),
        (select count(*)::integer from public.tickets t join public.orders o on o.id = t.order_id
            where t.event_id = e.id and o.status = 'paid' and t.status = 'valid' and t.checked_in_at is not null),
        case when public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer') then
            (select coalesce(sum(o.total), 0)::integer from public.orders o where o.event_id = e.id and o.status = 'paid')
        end,
        (select coalesce(sum(tt.quantity), 0)::integer from public.ticket_types tt where tt.event_id = e.id),
        (select coalesce(sum(public.ticket_type_remaining(tt.id)), 0)::integer from public.ticket_types tt where tt.event_id = e.id)
    from public.events e
    where e.community = p_community and public.is_staff()
$$;

create function public.promo_code_summaries(p_community text)
returns table (promo_code_id uuid, uses integer, discount_total integer, revenue integer)
language sql
stable
security definer
set search_path = ''
as $$
    select
        p.id,
        count(o.id)::integer,
        coalesce(sum(o.discount), 0)::integer,
        coalesce(sum(o.total), 0)::integer
    from public.promo_codes p
    left join public.orders o on o.promo_code_id = p.id and o.status = 'paid'
    where p.community = p_community
        and public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')
    group by p.id
$$;

create function public.dashboard_stats(p_community text, p_event_id uuid default null) returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
    v_stats jsonb;
begin
    if not public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer') then
        raise exception 'not_allowed';
    end if;

    with
    community_orders as (
        select o.* from public.orders o
        join public.events e on e.id = o.event_id
        where e.community = p_community
    ),
    scoped_orders as (
        select * from community_orders where p_event_id is null or event_id = p_event_id
    ),
    paid_orders as (
        select * from scoped_orders where status = 'paid'
    ),
    live_tickets as (
        select t.* from public.tickets t
        join paid_orders o on o.id = t.order_id
        where t.status = 'valid'
    ),
    scoped_types as (
        select tt.*, e.title as event_title
        from public.ticket_types tt
        join public.events e on e.id = tt.event_id
        where e.community = p_community and (p_event_id is null or tt.event_id = p_event_id)
    ),
    scoped_visits as (
        select * from public.page_visits
        where community = p_community and (p_event_id is null or event_id = p_event_id)
    ),
    repeaters as (
        select customer_id from community_orders
        where status = 'paid'
        group by customer_id
        having count(distinct event_id) >= 2
    )
    select jsonb_build_object(
        'tickets_sold', (select count(*) from live_tickets),
        'checked_in', (select count(*) from live_tickets where checked_in_at is not null),
        'gross_sales', (select coalesce(sum(total), 0) from scoped_orders where status in ('paid', 'refunded')),
        'net_sales', (select coalesce(sum(total), 0) from paid_orders),
        'average_order_value', (select coalesce(round(avg(total)), 0) from paid_orders where source = 'online'),
        'capacity', (select coalesce(sum(quantity), 0) from scoped_types),
        'remaining', (select coalesce(sum(public.ticket_type_remaining(id)), 0) from scoped_types),
        'orders', jsonb_build_object(
            'paid', (select count(*) from paid_orders),
            'pending', (select count(*) from scoped_orders where status = 'pending' and hold_expires_at > now()),
            'abandoned', (select count(*) from scoped_orders where status = 'expired' or (status = 'pending' and hold_expires_at <= now())),
            'failed', (select count(*) from scoped_orders where status = 'failed'),
            'cancelled', (select count(*) from scoped_orders where status = 'cancelled'),
            'refunded', (select count(*) from scoped_orders where status = 'refunded'),
            'needs_refund', (select count(*) from scoped_orders where needs_refund),
            'complimentary', (select count(*) from paid_orders where source = 'complimentary')
        ),
        'refunds', jsonb_build_object(
            'count', (select count(*) from scoped_orders where status = 'refunded'),
            'amount', (select coalesce(sum(refund_amount), 0) from scoped_orders where status = 'refunded')
        ),
        'page_views', (select count(*) from scoped_visits),
        'unique_visitors', (select count(distinct visitor_id) from scoped_visits),
        'conversion_rate', (
            select case when count(distinct v.visitor_id) = 0 then 0
                else round(100.0 * (select count(*) from paid_orders where source = 'online') / count(distinct v.visitor_id), 1)
            end
            from scoped_visits v
        ),
        'customers', jsonb_build_object(
            'total', (select count(distinct customer_id) from paid_orders),
            'repeat', (select count(distinct customer_id) from paid_orders where customer_id in (select customer_id from repeaters))
        ),
        'ticket_types', coalesce((
            select jsonb_agg(jsonb_build_object(
                'id', tt.id,
                'event_title', tt.event_title,
                'name', tt.name,
                'price', tt.price,
                'quantity', tt.quantity,
                'sold', coalesce((select sum(oi.quantity) from public.order_items oi join paid_orders o on o.id = oi.order_id where oi.ticket_type_id = tt.id), 0),
                'revenue', coalesce((select sum(oi.quantity * oi.unit_price) from public.order_items oi join paid_orders o on o.id = oi.order_id where oi.ticket_type_id = tt.id), 0),
                'remaining', public.ticket_type_remaining(tt.id)
            ) order by tt.event_title, tt.sort_order, tt.name)
            from scoped_types tt
        ), '[]'::jsonb),
        'promo_codes', coalesce((
            select jsonb_agg(row_to_json(p) order by p.uses desc)
            from (
                select pc.code, count(*) as uses, coalesce(sum(o.discount), 0) as discount, coalesce(sum(o.total), 0) as revenue
                from paid_orders o
                join public.promo_codes pc on pc.id = o.promo_code_id
                group by pc.code
            ) p
        ), '[]'::jsonb),
        'sources', coalesce((
            select jsonb_agg(row_to_json(s) order by s.orders desc)
            from (
                select coalesce(nullif(utm_source, ''), 'direct') as source, count(*) as orders, coalesce(sum(total), 0) as revenue
                from paid_orders
                where source = 'online'
                group by 1
            ) s
        ), '[]'::jsonb),
        'daily', (
            select jsonb_agg(jsonb_build_object('day', d.day, 'orders', d.orders, 'revenue', d.revenue) order by d.day)
            from (
                select day::date as day,
                    (select count(*) from paid_orders o where (o.paid_at at time zone 'Asia/Kolkata')::date = day::date) as orders,
                    (select coalesce(sum(total), 0) from paid_orders o where (o.paid_at at time zone 'Asia/Kolkata')::date = day::date) as revenue
                from generate_series(
                    (now() at time zone 'Asia/Kolkata')::date - 13,
                    (now() at time zone 'Asia/Kolkata')::date,
                    interval '1 day'
                ) as day
            ) d
        )
    ) into v_stats;

    return v_stats;
end;
$$;

create function public.community_members(p_community text)
returns table (
    id uuid,
    name text,
    email text,
    phone text,
    city text,
    marketing_consent boolean,
    events_booked integer,
    events_attended integer,
    tickets integer,
    total_spent integer,
    first_booked_at timestamptz,
    last_booked_at timestamptz,
    last_event_title text,
    last_event_at timestamptz,
    next_event_title text,
    next_event_at timestamptz,
    is_new boolean,
    is_regular boolean,
    has_upcoming boolean
)
language sql
stable
security definer
set search_path = ''
as $$
    select
        c.id,
        c.name,
        c.email,
        c.phone,
        c.city,
        coalesce(consent.marketing_consent, false),
        booked.events_booked,
        went.events_attended,
        went.tickets,
        booked.total_spent,
        booked.first_booked_at,
        booked.last_booked_at,
        last_event.title,
        last_event.starts_at,
        next_event.title,
        next_event.starts_at,
        booked.first_booked_at >= now() - interval '30 days',
        booked.events_booked >= 2,
        next_event.starts_at is not null
    from public.customers c
    left join public.customer_consents consent on consent.customer_id = c.id and consent.community = p_community
    cross join lateral (
        select
            count(distinct o.event_id)::integer as events_booked,
            coalesce(sum(o.total), 0)::integer as total_spent,
            min(o.created_at) as first_booked_at,
            max(o.created_at) as last_booked_at
        from public.orders o
        join public.events e on e.id = o.event_id
        where o.customer_id = c.id and o.status = 'paid' and e.community = p_community
    ) booked
    cross join lateral (
        select
            count(*)::integer as tickets,
            (count(distinct t.event_id) filter (where t.checked_in_at is not null))::integer as events_attended
        from public.tickets t
        join public.orders o on o.id = t.order_id
        join public.events e on e.id = o.event_id
        where o.customer_id = c.id and o.status = 'paid' and t.status = 'valid' and e.community = p_community
    ) went
    left join lateral (
        select e.title, e.starts_at
        from public.orders o
        join public.events e on e.id = o.event_id
        where o.customer_id = c.id and o.status = 'paid' and e.community = p_community and e.ends_at <= now()
        order by e.starts_at desc
        limit 1
    ) last_event on true
    left join lateral (
        select e.title, e.starts_at
        from public.orders o
        join public.events e on e.id = o.event_id
        where o.customer_id = c.id and o.status = 'paid' and e.community = p_community and e.ends_at > now()
        order by e.starts_at
        limit 1
    ) next_event on true
    where booked.events_booked > 0
        and public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')
$$;

create function public.community_stats(p_community text)
returns table (
    total integer,
    new_members integer,
    regulars integer,
    upcoming integer,
    past integer,
    updates_ok integer
)
language sql
stable
security definer
set search_path = ''
as $$
    select
        count(*)::integer,
        (count(*) filter (where m.is_new))::integer,
        (count(*) filter (where m.is_regular))::integer,
        (count(*) filter (where m.has_upcoming))::integer,
        (count(*) filter (where not m.has_upcoming))::integer,
        (count(*) filter (where m.marketing_consent))::integer
    from public.community_members(p_community) m
$$;

revoke execute on function
    public.upsert_customer(text, text, text, text),
    public.record_marketing_consent(uuid, text, boolean),
    public.generate_booking_code(uuid)
from public, anon, authenticated;

revoke execute on function
    public.event_summaries(text),
    public.promo_code_summaries(text),
    public.dashboard_stats(text, uuid),
    public.community_members(text),
    public.community_stats(text)
from public, anon;
