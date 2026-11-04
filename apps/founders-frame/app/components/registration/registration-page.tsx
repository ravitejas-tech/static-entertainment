import { RegistrationForm } from '~/components/registration/registration-form'
import { RegistrationHero } from '~/components/registration/registration-hero'
import { Container } from '~/components/ui/container'
import type { EventDetail } from '~/types/events'

export interface RegistrationPageProps {
    event: EventDetail
    seat: string | null
}

export function RegistrationPage({ event, seat }: RegistrationPageProps) {
    return (
        <div>
            <RegistrationHero event={event} />
            <Container className='pb-16 md:pb-24'>
                <RegistrationForm
                    event={event}
                    seat={seat}
                />
            </Container>
        </div>
    )
}
