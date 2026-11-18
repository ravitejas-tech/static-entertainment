import { RegistrationBlocked } from '~/components/registration/registration-blocked'
import { RegistrationPage } from '~/components/registration/registration-page'
import { QueryProvider } from '~/components/ui/query-provider'
import { blockedReason } from '~/lib/registration/options'
import type { EventDetail } from '~/types/events'

export interface RegistrationScreenProps {
    slug: string
    event: EventDetail | null
    seat: string | null
}

export function RegistrationScreen({ slug, event, seat }: RegistrationScreenProps) {
    const reason = event ? blockedReason(event) : 'missing'
    if (!event || reason) {
        return (
            <RegistrationBlocked
                reason={reason ?? 'missing'}
                slug={slug}
            />
        )
    }

    return (
        <QueryProvider>
            <RegistrationPage
                event={event}
                seat={seat}
            />
        </QueryProvider>
    )
}
