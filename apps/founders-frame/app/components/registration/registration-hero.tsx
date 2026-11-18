import { ArrowLeft } from 'lucide-react'
import { CoverBanner } from '~/components/events/cover-banner'
import { CoverFacts } from '~/components/events/cover-facts'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Container } from '~/components/ui/container'
import { Reveal } from '~/components/ui/reveal'
import { RiseWords } from '~/components/ui/rise-words'
import { Text } from '~/components/ui/text'
import { eventPath } from '~/data/navigation'
import { REGISTRATION_PAGE } from '~/data/registration/page'
import type { EventDetail } from '~/types/events'

export function RegistrationHero({ event }: { event: EventDetail }) {
    return (
        <CoverBanner photo={event.photo}>
            <Container className='flex min-h-96 flex-col justify-between gap-10 pt-4 pb-12 lg:min-h-110 lg:pt-7 lg:pb-16'>
                <AnchorLink
                    to={eventPath(event.slug)}
                    layout='overlay'
                    icon={<ArrowLeft aria-hidden />}
                    className='self-start'>
                    {REGISTRATION_PAGE.back}
                </AnchorLink>
                <div className='max-w-2xl space-y-4 lg:space-y-5'>
                    <Reveal trigger='load'>
                        <Text
                            variant='meta'
                            className='text-gold'>
                            {REGISTRATION_PAGE.title}
                        </Text>
                    </Reveal>
                    <Text
                        as='h1'
                        variant='display'
                        tone='inverse'>
                        <RiseWords
                            text={event.title}
                            trigger='load'
                            startOrder={1}
                            underlineLast
                        />
                    </Text>
                    <CoverFacts
                        event={event}
                        order={4}
                    />
                </div>
            </Container>
        </CoverBanner>
    )
}
