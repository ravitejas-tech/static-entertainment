import { CalendarDays, Languages, MapPin } from 'lucide-react'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { formatEventDay, formatTimeRange } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { EventDetail } from '~/types/events'

export interface CoverFactsProps {
    event: EventDetail
    order: number
    className?: string
}

export function CoverFacts({ event, order, className }: CoverFactsProps) {
    const facts = [
        {
            icon: CalendarDays,
            label: EVENT_PAGE_COPY.when(formatEventDay(event.startsAt), formatTimeRange(event.startsAt, event.endsAt)),
        },
        { icon: MapPin, label: event.venueName || event.city },
        { icon: Languages, label: event.language },
    ].filter(({ label }) => label)

    return (
        <Reveal
            trigger='load'
            order={order}
            className={cn('flex flex-wrap gap-x-6 gap-y-2.5 pt-1.5', className)}>
            {facts.map(({ icon: Icon, label }) => (
                <span
                    key={label}
                    className='inline-flex items-center gap-2'>
                    <Icon
                        aria-hidden
                        className='size-4.5 shrink-0 text-gold'
                    />
                    <Text
                        as='span'
                        variant='label'
                        tone='inverse'>
                        {label}
                    </Text>
                </span>
            ))}
        </Reveal>
    )
}
