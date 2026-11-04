import { useState } from 'react'
import { EventPanel } from '~/components/landing/event-panel'
import { MorePanel } from '~/components/landing/more-panel'
import type { EventSummary } from '~/types/events'

export interface EventPanelsProps {
    events: EventSummary[]
    prioritizeFirst?: boolean
}

export function EventPanels({ events, prioritizeFirst = false }: EventPanelsProps) {
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <div className='flex flex-col gap-2.5 lg:h-127 lg:flex-row lg:gap-3.5'>
            {events.map((event, index) => (
                <EventPanel
                    key={event.id}
                    event={event}
                    order={index}
                    first={index === 0}
                    priority={prioritizeFirst && index === 0}
                    open={openIndex === index}
                    onOpen={() => setOpenIndex(index)}
                />
            ))}
            <MorePanel
                order={events.length}
                open={openIndex === events.length}
                onOpen={() => setOpenIndex(events.length)}
            />
        </div>
    )
}
