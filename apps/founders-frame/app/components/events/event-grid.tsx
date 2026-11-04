import { EventCard } from '~/components/events/event-card'
import { SwipeGrid } from '~/components/ui/swipe-grid'
import type { EventSummary } from '~/types/events'

export interface EventGridProps {
    events: EventSummary[]
    prioritizeFirst?: boolean
}

export function EventGrid({ events, prioritizeFirst = false }: EventGridProps) {
    return (
        <SwipeGrid>
            {events.map((event, index) => (
                <EventCard
                    key={event.id}
                    event={event}
                    priority={prioritizeFirst && index === 0}
                />
            ))}
        </SwipeGrid>
    )
}
