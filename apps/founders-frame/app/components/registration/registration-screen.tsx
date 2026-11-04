import { RegistrationBlocked } from '~/components/registration/registration-blocked'
import { RegistrationPage } from '~/components/registration/registration-page'
import { QueryProvider } from '~/components/ui/query-provider'
import { blockedReason, eligibleOptions } from '~/lib/registration/options'
import type { EventDetail } from '~/types/events'
import type { RegistrationMode } from '~/types/registration'

export interface RegistrationScreenProps {
    mode: RegistrationMode
    slug: string
    event: EventDetail | null
    seat: string | null
}

export function RegistrationScreen({ mode, slug, event, seat }: RegistrationScreenProps) {
    if (!event) {
        return (
            <RegistrationBlocked
                reason='missing'
                slug={slug}
            />
        )
    }

    const reason = blockedReason(event, mode)
    if (reason) {
        return (
            <RegistrationBlocked
                reason={reason}
                slug={slug}
            />
        )
    }

    return (
        <QueryProvider>
            <RegistrationPage
                event={event}
                mode={mode}
                options={eligibleOptions(event, mode)}
                seat={seat}
            />
        </QueryProvider>
    )
}
