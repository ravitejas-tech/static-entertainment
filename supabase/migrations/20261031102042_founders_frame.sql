create table public.event_categories (
    community text not null references public.communities (slug) on update cascade on delete cascade,
    slug text not null check (slug ~ '^[a-z0-9]+(_[a-z0-9]+)*$'),
    label text not null check (char_length(label) between 2 and 40),
    sort_order integer not null default 0,
    primary key (community, slug)
);

insert into public.event_categories (community, slug, label, sort_order) values
    ('echoverse', 'dance_night', 'Dance night', 1),
    ('echoverse', 'social_mixer', 'Social mixer', 2),
    ('echoverse', 'workshop', 'Workshop', 3),
    ('echoverse', 'weekend_trip', 'Weekend trip', 4),
    ('echoverse', 'nightlife', 'Nightlife', 5),
    ('echoverse', 'meetup', 'Meetup', 6),
    ('founders-frame', 'networking_meetup', 'Networking meetup', 1),
    ('founders-frame', 'founder_mixer', 'Founder mixer', 2),
    ('founders-frame', 'roundtable', 'Roundtable', 3),
    ('founders-frame', 'investor_networking', 'Investor networking', 4),
    ('founders-frame', 'leadership_circle', 'Leadership circle', 5),
    ('founders-frame', 'panel_discussion', 'Panel discussion', 6),
    ('founders-frame', 'workshop', 'Workshop', 7),
    ('founders-frame', 'masterclass', 'Masterclass', 8),
    ('founders-frame', 'conference', 'Conference', 9);

alter table public.event_categories enable row level security;

create policy "Event categories are public" on public.event_categories
for select to anon, authenticated
using (true);

revoke insert, update, delete on public.event_categories from anon, authenticated;

alter table public.events alter column category type text using category::text;
alter table public.events
    add constraint events_community_category_fkey
        foreign key (community, category) references public.event_categories (community, slug) on update cascade,
    add column audience text[] not null default '{}',
    add column industries text[] not null default '{}',
    add column founder_stages text[] not null default '{}';
drop type public.event_category;

alter table public.ticket_types
    add column requires_approval boolean not null default false,
    add constraint ticket_types_approval_is_free check (not requires_approval or price = 0);

alter type public.order_source add value 'application';

create type public.member_type as enum ('founder', 'business_leader', 'investor', 'professional', 'student', 'ecosystem_partner');
create type public.application_status as enum ('pending', 'approved', 'waitlisted', 'rejected', 'confirmed', 'withdrawn');

create table public.companies (
    id uuid primary key default gen_random_uuid(),
    name text not null check (char_length(name) between 1 and 120),
    website text check (website ~ '^https?://'),
    industry text,
    stage text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create unique index companies_name_key on public.companies (lower(name));

create trigger companies_set_updated_at before update on public.companies
for each row execute function public.set_updated_at();

create table public.member_profiles (
    customer_id uuid primary key references public.customers (id) on delete cascade,
    member_type public.member_type not null,
    job_title text not null default '' check (char_length(job_title) <= 100),
    company_id uuid references public.companies (id) on delete set null,
    linkedin_url text check (linkedin_url ~ '^https?://'),
    looking_for text[] not null default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index member_profiles_company_id_idx on public.member_profiles (company_id);

create trigger member_profiles_set_updated_at before update on public.member_profiles
for each row execute function public.set_updated_at();

create table public.applications (
    id uuid primary key default gen_random_uuid(),
    access_token uuid not null unique default gen_random_uuid(),
    event_id uuid not null references public.events (id) on delete cascade,
    ticket_type_id uuid not null references public.ticket_types (id) on delete restrict,
    customer_id uuid not null references public.customers (id) on delete restrict,
    order_id uuid unique references public.orders (id) on delete set null,
    name text not null,
    email text not null check (email = lower(email)),
    phone text not null,
    answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
    status public.application_status not null default 'pending',
    review_note text not null default '',
    reviewed_by uuid references auth.users (id) on delete set null,
    reviewed_at timestamptz,
    confirmed_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint applications_one_per_event unique (event_id, customer_id)
);

create index applications_event_status_idx on public.applications (event_id, status, created_at desc);
create index applications_customer_id_idx on public.applications (customer_id);

create trigger applications_set_updated_at before update on public.applications
for each row execute function public.set_updated_at();

alter table public.companies enable row level security;
alter table public.member_profiles enable row level security;
alter table public.applications enable row level security;

create policy "Reporting staff see companies" on public.companies
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')));

create policy "Reporting staff see member profiles" on public.member_profiles
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')));

create policy "Reporting staff see applications" on public.applications
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')));

revoke insert, update, delete on public.companies, public.member_profiles, public.applications from anon, authenticated;

create function public.save_member_profile(p_customer_id uuid, p_profile jsonb) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_company jsonb := coalesce(p_profile -> 'company', '{}'::jsonb);
    v_company_name text := nullif(trim(coalesce(v_company ->> 'name', '')), '');
    v_website text := nullif(trim(coalesce(v_company ->> 'website', '')), '');
    v_linkedin text := nullif(trim(coalesce(p_profile ->> 'linkedin_url', '')), '');
    v_company_id uuid;
    v_member_type public.member_type;
begin
    if p_profile is null or jsonb_typeof(p_profile) <> 'object' then
        return;
    end if;

    if not coalesce(p_profile ->> 'member_type', '') = any (enum_range(null::public.member_type)::text[]) then
        raise exception 'invalid_profile';
    end if;
    v_member_type := (p_profile ->> 'member_type')::public.member_type;

    if v_company_name is not null then
        insert into public.companies (name, website, industry, stage)
        values (
            left(v_company_name, 120),
            case when v_website ~ '^https?://' then v_website end,
            nullif(trim(coalesce(v_company ->> 'industry', '')), ''),
            nullif(trim(coalesce(v_company ->> 'stage', '')), '')
        )
        on conflict ((lower(name))) do update set
            website = coalesce(excluded.website, public.companies.website),
            industry = coalesce(excluded.industry, public.companies.industry),
            stage = coalesce(excluded.stage, public.companies.stage)
        returning id into v_company_id;
    end if;

    insert into public.member_profiles (customer_id, member_type, job_title, company_id, linkedin_url, looking_for)
    values (
        p_customer_id,
        v_member_type,
        left(trim(coalesce(p_profile ->> 'job_title', '')), 100),
        v_company_id,
        case when v_linkedin ~ '^https?://' then v_linkedin end,
        case when jsonb_typeof(p_profile -> 'looking_for') = 'array' then
            coalesce((select array_agg(left(value, 60)) from jsonb_array_elements_text(p_profile -> 'looking_for') value), '{}')
        else '{}' end
    )
    on conflict (customer_id) do update set
        member_type = excluded.member_type,
        job_title = excluded.job_title,
        company_id = coalesce(excluded.company_id, public.member_profiles.company_id),
        linkedin_url = coalesce(excluded.linkedin_url, public.member_profiles.linkedin_url),
        looking_for = excluded.looking_for;
end;
$$;

create function public.submit_application(
    p_event_id uuid,
    p_ticket_type_id uuid,
    p_name text,
    p_email text,
    p_phone text,
    p_answers jsonb default '{}'::jsonb,
    p_profile jsonb default null,
    p_marketing_consent boolean default false
) returns public.applications
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_event public.events;
    v_type public.ticket_types;
    v_question jsonb;
    v_answers jsonb := coalesce(p_answers, '{}'::jsonb);
    v_customer_id uuid;
    v_application public.applications;
begin
    select * into v_event from public.events where id = p_event_id;
    if not found or v_event.status <> 'published' or v_event.ends_at < now() then
        raise exception 'event_unavailable';
    end if;
    if v_event.sales_paused then
        raise exception 'sales_paused';
    end if;

    select * into v_type from public.ticket_types where id = p_ticket_type_id and event_id = p_event_id;
    if not found
        or not v_type.requires_approval
        or not v_type.visible
        or v_type.sold_out
        or (v_type.sales_start is not null and v_type.sales_start > now())
        or (v_type.sales_end is not null and v_type.sales_end < now()) then
        raise exception 'ticket_unavailable';
    end if;

    perform public.validate_buyer(p_name, p_email, p_phone);

    if jsonb_typeof(v_answers) <> 'object' then
        raise exception 'invalid_answers';
    end if;
    for v_question in select value from jsonb_array_elements(v_event.questions) loop
        if coalesce((v_question ->> 'required')::boolean, false)
            and coalesce(trim(v_answers ->> (v_question ->> 'id')), '') = '' then
            raise exception 'answers_missing';
        end if;
    end loop;

    if exists (
        select 1 from public.applications a
        join public.customers c on c.id = a.customer_id
        where a.event_id = p_event_id and c.email = lower(trim(p_email))
    ) then
        raise exception 'already_applied';
    end if;

    v_customer_id := public.upsert_customer(p_name, p_email, p_phone, v_answers ->> 'city');
    perform public.save_member_profile(v_customer_id, p_profile);
    perform public.record_marketing_consent(v_customer_id, v_event.community, p_marketing_consent);

    insert into public.applications (event_id, ticket_type_id, customer_id, name, email, phone, answers)
    values (p_event_id, p_ticket_type_id, v_customer_id, trim(p_name), lower(trim(p_email)), trim(p_phone), v_answers)
    returning * into v_application;

    return v_application;
end;
$$;

create function public.review_application(p_application_id uuid, p_status public.application_status, p_note text default '')
returns public.applications
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_application public.applications;
begin
    if not public.has_staff_role('super_admin', 'event_manager') then
        raise exception 'not_allowed';
    end if;
    if p_status not in ('approved', 'waitlisted', 'rejected') then
        raise exception 'bad_request';
    end if;

    select * into v_application from public.applications where id = p_application_id for update;
    if not found then
        raise exception 'application_not_found';
    end if;
    if v_application.status in ('confirmed', 'withdrawn') then
        raise exception 'application_closed';
    end if;

    update public.applications
    set status = p_status,
        review_note = left(trim(coalesce(p_note, '')), 1000),
        reviewed_by = auth.uid(),
        reviewed_at = now()
    where id = p_application_id
    returning * into v_application;

    insert into public.activity_log (actor_id, actor_email, action, entity, entity_id, changes)
    values (auth.uid(), public.current_email(), 'review', 'applications', v_application.id::text,
        jsonb_build_object('name', v_application.name, 'status', p_status));

    return v_application;
end;
$$;

create function public.confirm_application(p_access_token uuid) returns public.orders
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_application public.applications;
    v_event public.events;
    v_type public.ticket_types;
    v_order public.orders;
begin
    select * into v_application from public.applications where access_token = p_access_token for update;
    if not found then
        raise exception 'application_not_found';
    end if;

    if v_application.status = 'confirmed' and v_application.order_id is not null then
        select * into v_order from public.orders where id = v_application.order_id;
        return v_order;
    end if;
    if v_application.status <> 'approved' then
        raise exception 'application_not_approved';
    end if;

    select * into v_event from public.events where id = v_application.event_id;
    if v_event.status <> 'published' or v_event.ends_at < now() then
        raise exception 'event_unavailable';
    end if;

    select * into v_type from public.ticket_types where id = v_application.ticket_type_id for update;
    if public.ticket_type_remaining(v_type.id) < 1 then
        raise exception 'sold_out';
    end if;

    insert into public.orders (
        booking_code, event_id, customer_id, name, email, phone, answers,
        subtotal, discount, total, status, source, payment_provider, paid_at, terms_accepted_at
    ) values (
        public.generate_booking_code(v_event.id),
        v_event.id,
        v_application.customer_id,
        v_application.name,
        v_application.email,
        v_application.phone,
        v_application.answers,
        0, 0, 0, 'paid', 'application', 'free', now(), v_application.created_at
    ) returning * into v_order;

    insert into public.order_items (order_id, ticket_type_id, quantity, unit_price, admits)
    values (v_order.id, v_type.id, 1, 0, v_type.admits);

    perform public.issue_tickets(v_order.id);

    update public.applications
    set status = 'confirmed', order_id = v_order.id, confirmed_at = now()
    where id = v_application.id;

    return v_order;
end;
$$;

create function public.get_application(p_access_token uuid) returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select jsonb_build_object(
        'community', e.community,
        'status', a.status,
        'name', a.name,
        'email', a.email,
        'created_at', a.created_at,
        'ticket_type', tt.name,
        'event', jsonb_build_object(
            'slug', e.slug,
            'title', e.title,
            'starts_at', e.starts_at,
            'ends_at', e.ends_at,
            'city', e.city,
            'venue_name', e.venue_name,
            'venue_address', e.venue_address,
            'cover_url', e.cover_url,
            'cover_alt', e.cover_alt
        ),
        'ticket_access_token', o.access_token
    )
    from public.applications a
    join public.events e on e.id = a.event_id
    join public.ticket_types tt on tt.id = a.ticket_type_id
    left join public.orders o on o.id = a.order_id
    where a.access_token = p_access_token
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
        if v_type.requires_approval then
            raise exception 'approval_required';
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
        included, not_included, things_to_know, faqs, terms, refund_policy, questions,
        audience, industries, founder_stages, status
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
        included, not_included, things_to_know, faqs, terms, refund_policy, questions,
        audience, industries, founder_stages, 'draft'
    from public.events
    where id = p_event_id
    returning id into v_new_id;

    if v_new_id is null then
        raise exception 'event_unavailable';
    end if;

    insert into public.ticket_types (
        event_id, name, description, price, quantity, admits,
        min_per_order, max_per_order, sales_start, sales_end, visible, sold_out, sort_order, requires_approval
    )
    select
        v_new_id, name, description, price, quantity, admits,
        min_per_order, max_per_order, sales_start, sales_end, visible, false, sort_order, requires_approval
    from public.ticket_types
    where event_id = p_event_id;

    return v_new_id;
end;
$$;

drop function public.event_summaries(text);

create function public.event_summaries(p_community text)
returns table (
    event_id uuid,
    tickets_sold integer,
    checked_in integer,
    gross_sales integer,
    capacity integer,
    remaining integer,
    applications_pending integer
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
        (select coalesce(sum(public.ticket_type_remaining(tt.id)), 0)::integer from public.ticket_types tt where tt.event_id = e.id),
        (select count(*)::integer from public.applications a where a.event_id = e.id and a.status = 'pending')
    from public.events e
    where e.community = p_community and public.is_staff()
$$;

revoke execute on function
    public.save_member_profile(uuid, jsonb),
    public.submit_application(uuid, uuid, text, text, text, jsonb, jsonb, boolean),
    public.confirm_application(uuid)
from public, anon, authenticated;

grant execute on function
    public.save_member_profile(uuid, jsonb),
    public.submit_application(uuid, uuid, text, text, text, jsonb, jsonb, boolean),
    public.confirm_application(uuid)
to service_role;

revoke execute on function
    public.review_application(uuid, public.application_status, text),
    public.event_summaries(text)
from public, anon;
