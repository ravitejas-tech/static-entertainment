import { CalendarDays, Languages, MapPin } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { ExternalLink } from '~/components/ui/external-link'
import { IconText } from '~/components/ui/icon-text'
import { DIRECTIONS_LABEL } from '~/data/events/media'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { withCity } from '~/lib/events'
import { formatFullDate, formatTimeRange } from '~/lib/format'
import type { EventDetail } from '~/types/events'

export function EventFacts({ event }: { event: EventDetail }) {
    return (
        <Card className='space-y-4'>
            <IconText
                icon={CalendarDays}
                detail={formatTimeRange(event.startsAt, event.endsAt)}>
                <time dateTime={event.startsAt}>{formatFullDate(event.startsAt)}</time>
            </IconText>
            <IconText
                icon={MapPin}
                detail={withCity(event.venueAddress, event.city)}
                action={<ExternalLink href={event.directionsUrl}>{DIRECTIONS_LABEL}</ExternalLink>}>
                {event.venueName || event.city}
            </IconText>
            {event.language && (
                <IconText
                    icon={Languages}
                    detail={event.language}>
                    {EVENT_PAGE_COPY.facts.language}
                </IconText>
            )}
        </Card>
    )
}
