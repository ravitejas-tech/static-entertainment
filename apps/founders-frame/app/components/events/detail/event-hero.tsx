import { ArrowLeft } from 'lucide-react'
import { CoverBanner } from '~/components/events/cover-banner'
import { CoverFacts } from '~/components/events/cover-facts'
import { PriceBadge } from '~/components/events/price-badge'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Container } from '~/components/ui/container'
import { Reveal } from '~/components/ui/reveal'
import { RiseWords } from '~/components/ui/rise-words'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { PATHS } from '~/data/navigation'
import type { EventDetail } from '~/types/events'

export function EventHero({ event }: { event: EventDetail }) {
    return (
        <CoverBanner photo={event.photo}>
            <Container className='flex min-h-130 flex-col justify-between gap-10 pt-4 pb-16 lg:min-h-150 lg:pt-7 lg:pb-18'>
                <AnchorLink
                    to={PATHS.events}
                    layout='overlay'
                    icon={<ArrowLeft aria-hidden />}
                    className='self-start'>
                    {EVENT_PAGE_COPY.back}
                </AnchorLink>
                <div className='max-w-2xl space-y-4 lg:space-y-5'>
                    <Reveal
                        trigger='load'
                        className='flex flex-wrap items-center gap-3'>
                        <PriceBadge price={event.fromPrice} />
                        <Text
                            as='span'
                            variant='meta'
                            className='text-gold'>
                            {event.categoryLabel}
                        </Text>
                    </Reveal>
                    <Text
                        as='h1'
                        variant='hero'
                        tone='inverse'>
                        <RiseWords
                            text={event.title}
                            trigger='load'
                            startOrder={1}
                            underlineLast
                        />
                    </Text>
                    {event.summary && (
                        <Reveal
                            trigger='load'
                            order={4}>
                            <Text
                                variant='lead'
                                tone='inverse-muted'>
                                {event.summary}
                            </Text>
                        </Reveal>
                    )}
                    <CoverFacts
                        event={event}
                        order={5}
                        className='hidden lg:flex'
                    />
                </div>
            </Container>
        </CoverBanner>
    )
}
