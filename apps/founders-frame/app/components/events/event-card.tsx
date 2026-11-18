import { Link } from 'react-router'
import { EventCover } from '~/components/events/event-cover'
import { PriceBadge } from '~/components/events/price-badge'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { eventPath } from '~/data/navigation'
import { formatEventDay, formatEventTime } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export function EventCard({ event }: { event: EventSummary }) {
    const { slug, title, categoryLabel, fromPrice, startsAt, city, venueName, photo, ended, open } = event

    return (
        <Card
            padding='none'
            interactive
            className='relative flex h-full flex-col'>
            <article className='flex h-full flex-col'>
                <EventCover
                    cover={photo}
                    shape='card'
                />
                <div className='flex flex-1 flex-col gap-2.5 p-5 sm:px-6 sm:pb-6'>
                    <div className='flex flex-wrap items-center gap-x-2.5 gap-y-2'>
                        <PriceBadge price={fromPrice} />
                        {ended ? (
                            <Badge tone='outline'>{EVENT_CARD_COPY.ended}</Badge>
                        ) : (
                            !open && <Badge tone='outline'>{EVENT_CARD_COPY.closed}</Badge>
                        )}
                        <Text
                            as='span'
                            variant='meta'>
                            {categoryLabel}
                        </Text>
                    </div>
                    <Text
                        as='h3'
                        variant='title'>
                        <Link
                            to={eventPath(slug)}
                            className='after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent'>
                            {title}
                        </Link>
                    </Text>
                    <Text
                        variant='small'
                        tone='secondary'>
                        <time dateTime={startsAt}>
                            {EVENT_CARD_COPY.when(
                                formatEventDay(startsAt),
                                formatEventTime(startsAt),
                                venueName || city,
                            )}
                        </time>
                    </Text>
                </div>
            </article>
        </Card>
    )
}
