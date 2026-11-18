import type { EventDetail } from '~/types/events'
import type { BlockedReason } from '~/types/registration'

export function blockedReason(event: EventDetail): BlockedReason | null {
    if (event.ended) return 'ended'
    return event.open ? null : 'closed'
}
