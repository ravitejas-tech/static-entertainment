drop function public.get_application(uuid);
drop function public.confirm_application(uuid);
drop function public.review_application(uuid, public.application_status, text);
drop function public.submit_application(uuid, uuid, text, text, text, jsonb, jsonb, boolean);
drop function public.event_summaries(text);

drop table public.applications;
drop type public.application_status;

update public.orders set source = 'complimentary' where source = 'application';

alter type public.order_source rename to order_source_old;
create type public.order_source as enum ('online', 'complimentary');
alter table public.orders alter column source drop default;
alter table public.orders alter column source type public.order_source using source::text::public.order_source;
alter table public.orders alter column source set default 'online';
drop type public.order_source_old;

alter table public.ticket_types
    drop constraint ticket_types_approval_is_free,
    drop column requires_approval;

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

revoke execute on function public.event_summaries(text) from public, anon;
