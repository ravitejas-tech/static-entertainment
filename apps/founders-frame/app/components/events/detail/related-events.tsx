import { EventGrid } from '~/components/events/event-grid'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import type { EventSummary } from '~/types/events'

export function RelatedEvents({ events }: { events: EventSummary[] }) {
    return (
        <section className='space-y-6 border-t border-border pt-12'>
            <Text
                as='h2'
                variant='heading'>
                {EVENT_PAGE_COPY.blocks.related}
            </Text>
            <EventGrid events={events} />
        </section>
    )
}
