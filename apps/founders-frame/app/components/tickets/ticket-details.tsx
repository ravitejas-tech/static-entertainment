import { CalendarDays, MapPin } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { ExternalLink } from '~/components/ui/external-link'
import { FactList } from '~/components/ui/fact-list'
import { IconText } from '~/components/ui/icon-text'
import { Text } from '~/components/ui/text'
import { DIRECTIONS_LABEL } from '~/data/events/media'
import { TICKET_PAGE } from '~/data/tickets/page'
import { directionsUrl, withCity } from '~/lib/events'
import { formatFullDate, formatTimeRange } from '~/lib/format'
import type { Booking } from '~/types/booking'

export function TicketDetails({ booking: { event, order } }: { booking: Booking }) {
    return (
        <Card className='space-y-5'>
            <Text
                as='h2'
                variant='title'>
                {event.title}
            </Text>
            <div className='space-y-3'>
                <IconText
                    icon={CalendarDays}
                    detail={formatTimeRange(event.starts_at, event.ends_at)}>
                    <time dateTime={event.starts_at}>{formatFullDate(event.starts_at)}</time>
                </IconText>
                <IconText
                    icon={MapPin}
                    detail={withCity(event.venue_address, event.city)}
                    action={<ExternalLink href={directionsUrl(event)}>{DIRECTIONS_LABEL}</ExternalLink>}>
                    {event.venue_name || event.city}
                </IconText>
            </div>
            <FactList
                facts={[
                    { label: TICKET_PAGE.attendee, value: order.name },
                    { label: TICKET_PAGE.bookingCode, value: order.booking_code },
                ]}
            />
        </Card>
    )
}
