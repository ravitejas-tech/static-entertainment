import type { Booking } from '~/types/booking'

export function ticketScreenState(booking: Booking | null | undefined, isError: boolean) {
    if (isError) return 'loadFailed'
    if (!booking) return 'notFound'
    if (booking.order.status === 'pending') return 'pending'
    return booking.order.status === 'paid' ? null : 'closed'
}
