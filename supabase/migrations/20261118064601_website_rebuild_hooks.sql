create extension if not exists pg_net with schema extensions;

create function public.request_site_rebuild(p_community text) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_requested text := 'site_rebuild.' || replace(p_community, '-', '_');
    v_hook text;
begin
    if current_setting(v_requested, true) = 'on' then
        return;
    end if;

    select decrypted_secret into v_hook
    from vault.decrypted_secrets
    where name = 'deploy_hook_' || p_community;

    if v_hook is null then
        return;
    end if;

    perform set_config(v_requested, 'on', true);
    perform net.http_post(url := v_hook);
end;
$$;

revoke execute on function public.request_site_rebuild(text) from public, anon, authenticated;

create function public.rebuild_site_for_event() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if tg_op <> 'DELETE' and new.status = 'published' then
        perform public.request_site_rebuild(new.community);
    end if;
    if tg_op <> 'INSERT' and old.status = 'published' then
        perform public.request_site_rebuild(old.community);
    end if;
    return null;
end;
$$;

create function public.rebuild_site_for_event_detail() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    perform public.request_site_rebuild(e.community)
    from public.events e
    where e.status = 'published'
        and e.id in (new.event_id, old.event_id);
    return null;
end;
$$;

create function public.rebuild_site_for_category() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    perform public.request_site_rebuild(coalesce(new.community, old.community));
    return null;
end;
$$;

revoke execute on function public.rebuild_site_for_event() from public, anon, authenticated;
revoke execute on function public.rebuild_site_for_event_detail() from public, anon, authenticated;
revoke execute on function public.rebuild_site_for_category() from public, anon, authenticated;

create trigger events_rebuild_site after insert or update or delete on public.events
for each row execute function public.rebuild_site_for_event();

create trigger ticket_types_rebuild_site after insert or update or delete on public.ticket_types
for each row execute function public.rebuild_site_for_event_detail();

create trigger gallery_photos_rebuild_site after insert or update or delete on public.gallery_photos
for each row execute function public.rebuild_site_for_event_detail();

create trigger event_categories_rebuild_site after insert or update or delete on public.event_categories
for each row execute function public.rebuild_site_for_category();

select cron.schedule(
    'rebuild-websites-nightly',
    '30 20 * * *',
    'select public.request_site_rebuild(slug) from public.communities'
);
