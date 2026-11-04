import { isOpen } from '~/lib/events'
import type { EventDetail } from '~/types/events'
import type { RegistrationMode } from '~/types/registration'

export function eligibleOptions({ options }: EventDetail, mode: RegistrationMode) {
    return options.filter(
        ({ status, price, requiresApproval }) =>
            isOpen(status) && price === 0 && requiresApproval === (mode === 'apply'),
    )
}

export function blockedReason(event: EventDetail, mode: RegistrationMode) {
    if (event.ended) return 'ended'
    return eligibleOptions(event, mode).length === 0 ? 'closed' : null
}
