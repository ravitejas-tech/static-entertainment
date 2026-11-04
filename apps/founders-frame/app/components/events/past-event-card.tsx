import { Link } from 'react-router'
import { EventCover } from '~/components/events/event-cover'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { EVENTS_AGENDA } from '~/data/events/meta'
import { eventPath } from '~/data/navigation'
import { PHOTO_SIZES } from '~/data/ui/media'
import { formatEventDay } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export function PastEventCard({ event }: { event: EventSummary }) {
    const { slug, title, startsAt, venueName, city, photo } = event

    return (
        <article className='relative flex items-center gap-4 rounded-2xl border border-border bg-surface p-2.5'>
            <EventCover
                cover={photo}
                sizes={PHOTO_SIZES.thumb}
                className='aspect-square w-21 shrink-0 rounded-xl grayscale-70'
            />
            <div className='min-w-0 space-y-1.5'>
                <Badge tone='neutral'>{EVENTS_AGENDA.ended(formatEventDay(startsAt))}</Badge>
                <Text
                    as='h3'
                    variant='subtitle'
                    className='text-base/snug'>
                    <Link
                        to={eventPath(slug)}
                        className='after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent'>
                        {title}
                    </Link>
                </Text>
                <Text
                    variant='small'
                    tone='muted'>
                    {venueName || city}
                </Text>
            </div>
        </article>
    )
}
