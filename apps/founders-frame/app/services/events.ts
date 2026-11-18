import { COMMUNITY_SLUG } from '~/data/brand'
import { supabase } from '~/services/supabase'

const EVENT_WITH_TICKETS = '*, ticket_types(*)'

export async function listPublishedEvents() {
    const { data, error } = await supabase
        .from('events')
        .select(EVENT_WITH_TICKETS)
        .eq('community', COMMUNITY_SLUG)
        .eq('status', 'published')
        .order('starts_at')
        .order('sort_order', { referencedTable: 'ticket_types' })
    if (error) throw error
    return data
}

export async function getPublishedEvent(slug: string) {
    const { data, error } = await supabase
        .from('events')
        .select(EVENT_WITH_TICKETS)
        .eq('community', COMMUNITY_SLUG)
        .eq('status', 'published')
        .eq('slug', slug)
        .order('sort_order', { referencedTable: 'ticket_types' })
        .maybeSingle()
    if (error) throw error
    return data
}

export async function getEventPreview(slug: string, previewToken: string) {
    const [event, ticketTypes] = await Promise.all([
        supabase.rpc('get_event_preview', { p_slug: slug, p_preview_token: previewToken }).maybeSingle(),
        supabase.rpc('get_event_preview_ticket_types', { p_slug: slug, p_preview_token: previewToken }),
    ])
    if (event.error) throw event.error
    if (ticketTypes.error) throw ticketTypes.error
    return event.data?.community === COMMUNITY_SLUG ? { ...event.data, ticket_types: ticketTypes.data } : null
}

export async function getTicketAvailability(eventIds: string[]) {
    if (eventIds.length === 0) return new Map<string, number>()
    const { data, error } = await supabase.rpc('ticket_availability', { p_event_ids: eventIds })
    if (error) throw error
    return new Map(data.map(({ ticket_type_id, remaining }) => [ticket_type_id, remaining]))
}

export async function listCategoryLabels() {
    const { data, error } = await supabase
        .from('event_categories')
        .select('slug, label')
        .eq('community', COMMUNITY_SLUG)
    if (error) throw error
    return new Map(data.map(({ slug, label }) => [slug, label]))
}
