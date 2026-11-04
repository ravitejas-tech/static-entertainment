import { StateScreen } from '~/components/ui/state-screen'
import { eventPath, PATHS } from '~/data/navigation'
import { REGISTRATION_PAGE } from '~/data/registration/page'
import type { BlockedReason } from '~/types/registration'

export interface RegistrationBlockedProps {
    reason: BlockedReason
    slug: string
}

export function RegistrationBlocked({ reason, slug }: RegistrationBlockedProps) {
    const missing = reason === 'missing'

    return (
        <StateScreen
            {...REGISTRATION_PAGE.blocked[reason]}
            actionLabel={missing ? REGISTRATION_PAGE.more : REGISTRATION_PAGE.back}
            actionTo={missing ? PATHS.events : eventPath(slug)}
        />
    )
}
