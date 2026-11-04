import { CalendarDays, MapPin } from 'lucide-react'
import { FormatBadge } from '~/components/events/format-badge'
import { Card } from '~/components/ui/card'
import { IconText } from '~/components/ui/icon-text'
import { Text } from '~/components/ui/text'
import { REGISTRATION_PAGE } from '~/data/registration/page'
import { formatFullDate, formatTimeRange } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export function EventSummaryCard({ event }: { event: EventSummary }) {
    return (
        <Card className='space-y-4'>
            <Text variant='meta'>{REGISTRATION_PAGE.summaryTitle}</Text>
            <div className='space-y-2'>
                <FormatBadge format={event.format} />
                <Text variant='title'>{event.title}</Text>
            </div>
            <div className='space-y-2 border-t border-border pt-4'>
                <IconText
                    icon={CalendarDays}
                    detail={formatTimeRange(event.startsAt, event.endsAt)}>
                    <time dateTime={event.startsAt}>{formatFullDate(event.startsAt)}</time>
                </IconText>
                <IconText icon={MapPin}>{event.venueName || event.city}</IconText>
            </div>
        </Card>
    )
}
