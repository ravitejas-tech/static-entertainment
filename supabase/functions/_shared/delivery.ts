import type { SupabaseClient } from 'npm:@supabase/supabase-js@2'
import { type ApplicationEmailKind, type ApplicationNotice, buildApplicationEmail } from './application-email.ts'
import type { Booking } from './booking.ts'
import { sendEmail } from './email.ts'
import { buildRefundEmail, buildTicketEmail } from './ticket-email.ts'

export async function loadBooking(admin: SupabaseClient, orderId: string) {
    const { data: order, error } = await admin.from('orders').select('access_token').eq('id', orderId).single()
    if (error || !order) throw new Error('order_not_found')
    const { data: booking, error: bookingError } = await admin.rpc('get_booking', { p_access_token: order.access_token })
    if (bookingError || !booking) throw new Error('order_not_found')
    return { booking: booking as Booking, accessToken: order.access_token as string }
}

export async function deliverTickets(admin: SupabaseClient, orderId: string) {
    const { booking, accessToken } = await loadBooking(admin, orderId)
    if (booking.order.status !== 'paid' || booking.tickets.length === 0) return false
    await sendEmail(await buildTicketEmail(booking, accessToken))
    return true
}

export async function deliverTicketsQuietly(admin: SupabaseClient, orderId: string) {
    try {
        return await deliverTickets(admin, orderId)
    } catch (error) {
        console.error('Ticket email failed', orderId, error)
        return false
    }
}

export async function deliverRefundNotice(admin: SupabaseClient, orderId: string, amount: number) {
    try {
        const { booking } = await loadBooking(admin, orderId)
        await sendEmail(buildRefundEmail(booking, amount))
    } catch (error) {
        console.error('Refund email failed', orderId, error)
    }
}

interface ApplicationRow {
    access_token: string
    name: string
    email: string
    ticket_types: { name: string }
    events: {
        title: string
        starts_at: string
        venue_name: string
        city: string
        communities: { slug: string; name: string; site_url: string | null }
    }
}

async function loadApplicationNotice(admin: SupabaseClient, applicationId: string): Promise<ApplicationNotice> {
    const { data, error } = await admin
        .from('applications')
        .select(
            'access_token, name, email, ticket_types(name), events(title, starts_at, venue_name, city, communities(slug, name, site_url))',
        )
        .eq('id', applicationId)
        .single()
    if (error || !data) throw new Error('application_not_found')
    const { access_token, name, email, ticket_types, events } = data as unknown as ApplicationRow
    const { communities, ...event } = events
    return { accessToken: access_token, name, email, ticketType: ticket_types.name, event, community: communities }
}

export async function deliverApplicationEmailQuietly(admin: SupabaseClient, applicationId: string, kind: ApplicationEmailKind) {
    try {
        await sendEmail(buildApplicationEmail(await loadApplicationNotice(admin, applicationId), kind))
        return true
    } catch (error) {
        console.error('Application email failed', applicationId, kind, error)
        return false
    }
}
