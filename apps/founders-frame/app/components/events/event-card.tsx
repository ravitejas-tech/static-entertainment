import { CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { EventCover } from '~/components/events/event-cover'
import { FormatBadge } from '~/components/events/format-badge'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { IconText } from '~/components/ui/icon-text'
import { Text } from '~/components/ui/text'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { eventPath } from '~/data/navigation'
import { formatEventDay, formatTimeRange } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export interface EventCardProps {
    event: EventSummary
    priority?: boolean
}

export function EventCard({ event, priority = false }: EventCardProps) {
    const { slug, title, categoryLabel, format, summary, startsAt, endsAt, city, venueName, photo, ended, open } = event

    return (
        <Card
            padding='none'
            interactive
            className='relative flex h-full flex-col'>
            <article className='flex h-full flex-col'>
                <EventCover
                    cover={photo}
                    shape='card'
                    priority={priority}
                />
                <div className='flex flex-1 flex-col gap-4 p-5 sm:p-6'>
                    <div className='flex flex-wrap items-center gap-2'>
                        <FormatBadge format={format} />
                        {ended ? (
                            <Badge tone='outline'>{EVENT_CARD_COPY.ended}</Badge>
                        ) : (
                            !open && <Badge tone='outline'>{EVENT_CARD_COPY.closed}</Badge>
                        )}
                    </div>
                    <div className='space-y-2'>
                        <Text variant='meta'>{categoryLabel}</Text>
                        <Text
                            as='h3'
                            variant='title'>
                            <Link
                                to={eventPath(slug)}
                                className='after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent'>
                                {title}
                            </Link>
                        </Text>
                        {summary && (
                            <Text
                                variant='small'
                                tone='secondary'
                                className='line-clamp-2'>
                                {summary}
                            </Text>
                        )}
                    </div>
                    <div className='mt-auto space-y-2 border-t border-border pt-4'>
                        <IconText
                            icon={CalendarDays}
                            detail={formatTimeRange(startsAt, endsAt)}>
                            <time dateTime={startsAt}>{formatEventDay(startsAt)}</time>
                        </IconText>
                        <IconText icon={MapPin}>{venueName || city}</IconText>
                    </div>
                </div>
            </article>
        </Card>
    )
}
