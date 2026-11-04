import { ArrowLeft } from 'lucide-react'
import { ApplicationSubmitted } from '~/components/registration/application-submitted'
import { EventSummaryCard } from '~/components/registration/event-summary-card'
import { RegistrationForm } from '~/components/registration/registration-form'
import { ReviewProcess } from '~/components/registration/review-process'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Container } from '~/components/ui/container'
import { Text } from '~/components/ui/text'
import { eventPath } from '~/data/navigation'
import { REGISTRATION_PAGE } from '~/data/registration/page'
import { useRegistrationSubmit } from '~/hooks/registration/use-registration-submit'
import type { EventDetail, RegistrationOption } from '~/types/events'
import type { RegistrationMode } from '~/types/registration'

export interface RegistrationPageProps {
    event: EventDetail
    mode: RegistrationMode
    options: RegistrationOption[]
    seat: string | null
}

export function RegistrationPage({ event, mode, options, seat }: RegistrationPageProps) {
    const { submit, pending, submitted } = useRegistrationSubmit(event, mode)
    const copy = REGISTRATION_PAGE.modes[mode]

    return (
        <Container className='space-y-8 py-10 md:py-14'>
            <AnchorLink
                to={eventPath(event.slug)}
                layout='list'
                icon={<ArrowLeft aria-hidden />}>
                {REGISTRATION_PAGE.back}
            </AnchorLink>
            <div className='grid gap-10 lg:grid-cols-12 lg:gap-12'>
                <div className='space-y-8 lg:col-span-7'>
                    <div className='space-y-3'>
                        <Text variant='meta'>{copy.eyebrow}</Text>
                        <Text
                            as='h1'
                            variant='display'>
                            {copy.title}
                        </Text>
                        <Text
                            variant='lead'
                            tone='secondary'>
                            {copy.lead}
                        </Text>
                    </div>
                    {submitted ? (
                        <ApplicationSubmitted accessToken={submitted.accessToken} />
                    ) : (
                        <>
                            {mode === 'apply' && <ReviewProcess />}
                            <RegistrationForm
                                event={event}
                                mode={mode}
                                options={options}
                                seat={seat}
                                pending={pending}
                                onSubmit={submit}
                            />
                        </>
                    )}
                </div>
                <aside className='lg:sticky lg:top-24 lg:col-span-5 lg:self-start'>
                    <EventSummaryCard event={event} />
                </aside>
            </div>
        </Container>
    )
}
