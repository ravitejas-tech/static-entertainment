import { CalendarDays, MapPin } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { FactList } from '~/components/ui/fact-list'
import { IconText } from '~/components/ui/icon-text'
import { Text } from '~/components/ui/text'
import { APPLICATION_PAGE } from '~/data/applications/page'
import { APPLICATION_STATUS } from '~/data/applications/status'
import { formatFullDate, formatTimeRange } from '~/lib/format'
import type { Application } from '~/types/application'

export function ApplicationStatusCard({ application }: { application: Application }) {
    const { status, event, ticket_type, created_at } = application
    const copy = APPLICATION_STATUS[status]

    return (
        <Card
            padding='lg'
            elevated
            className='space-y-6'>
            <div className='space-y-3'>
                <Badge tone={copy.tone}>{copy.label}</Badge>
                <Text
                    as='h1'
                    variant='display'>
                    {copy.title}
                </Text>
                <Text
                    variant='lead'
                    tone='secondary'>
                    {copy.body}
                </Text>
            </div>
            <div className='space-y-3 border-t border-border pt-5'>
                <Text variant='title'>{event.title}</Text>
                <IconText
                    icon={CalendarDays}
                    detail={formatTimeRange(event.starts_at, event.ends_at)}>
                    <time dateTime={event.starts_at}>{formatFullDate(event.starts_at)}</time>
                </IconText>
                <IconText icon={MapPin}>{event.venue_name || event.city}</IconText>
            </div>
            <FactList
                facts={[
                    { label: APPLICATION_PAGE.seat, value: ticket_type },
                    { label: APPLICATION_PAGE.appliedOn, value: formatFullDate(created_at) },
                ]}
            />
        </Card>
    )
}
