import { MAPS_DIRECTIONS } from '~/data/events/media'
import { FEW_LEFT_THRESHOLD, OPEN_STATUSES } from '~/data/events/status'
import { isOneOf } from '~/lib/options'
import type { EventLocation, RegistrationOption, SeatStatus, TicketTypeRow } from '~/types/events'

export const hasPassed = (instant: string, now: number) => Date.parse(instant) <= now

export function isOpen(status: SeatStatus) {
    return isOneOf(OPEN_STATUSES, status)
}

export function lowestPrice(options: Pick<RegistrationOption, 'price'>[]) {
    return options.length > 0 ? Math.min(...options.map(({ price }) => price)) : null
}

export function seatStatus(
    type: TicketTypeRow,
    remaining: number | undefined,
    paused: boolean,
    now: number,
): SeatStatus {
    if (type.sold_out || (remaining !== undefined && remaining < 1)) return 'full'
    if (type.sales_start && !hasPassed(type.sales_start, now)) return 'opens-later'
    if (paused || (type.sales_end && hasPassed(type.sales_end, now))) return 'closed'
    return remaining !== undefined && remaining <= FEW_LEFT_THRESHOLD ? 'few-left' : 'open'
}

export function directionsUrl({ venue_lat, venue_lng, map_url, venue_name, venue_address, city }: EventLocation) {
    const pinned = venue_lat !== null && venue_lng !== null
    if (!pinned && map_url) return map_url
    const destination = pinned
        ? `${venue_lat},${venue_lng}`
        : [venue_name, venue_address, city].filter(Boolean).join(', ')
    return `${MAPS_DIRECTIONS.url}?${new URLSearchParams({ api: MAPS_DIRECTIONS.api, destination })}`
}

export function withCity(address: string, city: string) {
    return address.toLowerCase().includes(city.toLowerCase()) ? address : [address, city].filter(Boolean).join(', ')
}
