import { ArrowRight } from 'lucide-react'
import { MoreGatheringsPanel } from '~/components/events/detail/more-gatherings-panel'
import { EventCard } from '~/components/events/event-card'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Container } from '~/components/ui/container'
import { Reveal } from '~/components/ui/reveal'
import { RiseWords } from '~/components/ui/rise-words'
import { SwipeGrid } from '~/components/ui/swipe-grid'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY, RELATED_EVENTS_LIMIT } from '~/data/events/page'
import { HOME_EVENTS_HEADING } from '~/data/landing/events'
import { PATHS } from '~/data/navigation'
import type { EventSummary } from '~/types/events'

export function RelatedEvents({ events }: { events: EventSummary[] }) {
    const items = [
        ...events.map((event, index) => (
            <Reveal
                key={event.id}
                effect='lift'
                order={index}
                className='h-full'>
                <EventCard event={event} />
            </Reveal>
        )),
        ...(events.length < RELATED_EVENTS_LIMIT
            ? [
                  <Reveal
                      key='more'
                      effect='lift'
                      order={events.length}
                      className='h-full'>
                      <MoreGatheringsPanel />
                  </Reveal>,
              ]
            : []),
    ]

    return (
        <section className='border-t border-border bg-surface-muted py-14 md:py-24'>
            <Container className='space-y-6 md:space-y-8'>
                <div className='flex items-end justify-between gap-4'>
                    <Text
                        as='h2'
                        variant='heading'>
                        <RiseWords text={EVENT_PAGE_COPY.blocks.related} />
                    </Text>
                    <AnchorLink
                        to={PATHS.events}
                        layout='arrow'
                        trailingIcon={<ArrowRight aria-hidden />}>
                        {HOME_EVENTS_HEADING.all}
                    </AnchorLink>
                </div>
                <SwipeGrid fillRow>{items}</SwipeGrid>
            </Container>
        </section>
    )
}
