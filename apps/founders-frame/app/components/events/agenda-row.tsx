import { MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { EventCover } from '~/components/events/event-cover'
import { FormatBadge } from '~/components/events/format-badge'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { EVENT_FORMATS } from '~/data/events/formats'
import { EVENTS_AGENDA } from '~/data/events/meta'
import { eventPath } from '~/data/navigation'
import { PHOTO_SIZES } from '~/data/ui/media'
import { formatDateBadge, formatEventTime } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { EventSummary } from '~/types/events'

export interface AgendaRowProps {
    event: EventSummary
    past?: boolean
}

export function AgendaRow({ event, past = false }: AgendaRowProps) {
    const { slug, title, categoryLabel, format, summary, startsAt, venueName, city, photo, open } = event
    const { weekday, day } = formatDateBadge(startsAt)

    return (
        <article
            className={cn(
                'relative flex overflow-clip rounded-2xl border border-border transition duration-300 ease-out motion-reduce:transition-none',
                past ? 'bg-surface-muted' : 'bg-surface hover:border-gold hover:shadow-card',
            )}>
            <div className='flex w-24 shrink-0 flex-col items-center justify-center gap-1 border-r border-border px-2 py-5 xl:w-28'>
                <Text
                    as='span'
                    variant='meta'
                    tone='inherit'
                    className={past ? 'text-text-muted' : 'text-tint-gold-text'}>
                    {weekday}
                </Text>
                <Text
                    as='span'
                    variant='stat'
                    tone={past ? 'secondary' : 'primary'}
                    className='text-4xl/none lg:text-5xl/none'>
                    <time dateTime={startsAt}>{day}</time>
                </Text>
                {!past && (
                    <Text
                        as='span'
                        variant='small'
                        tone='muted'>
                        {formatEventTime(startsAt)}
                    </Text>
                )}
            </div>
            <EventCover
                cover={photo}
                sizes={PHOTO_SIZES.agenda}
                className={cn('aspect-auto shrink-0 rounded-none', past ? 'w-40 grayscale-70 xl:w-48' : 'w-52 xl:w-72')}
            />
            <div className='flex min-w-0 flex-1 flex-col justify-between gap-4 p-5 lg:p-6'>
                <div className='space-y-2'>
                    <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
                        {past ? <Badge tone='neutral'>{EVENT_CARD_COPY.ended}</Badge> : <FormatBadge format={format} />}
                        {!past && !open && <Badge tone='outline'>{EVENT_CARD_COPY.closed}</Badge>}
                        <Text
                            as='span'
                            variant='meta'
                            tone={past ? 'muted' : 'accent'}>
                            {categoryLabel}
                        </Text>
                    </div>
                    <Text
                        as='h3'
                        variant='title'
                        tone={past ? 'secondary' : 'primary'}
                        className={cn(!past && 'lg:text-2xl/snug')}>
                        <Link
                            to={eventPath(slug)}
                            className='after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent'>
                            {title}
                        </Link>
                    </Text>
                    {!past && summary && (
                        <Text
                            variant='small'
                            tone='secondary'
                            className='line-clamp-2'>
                            {summary}
                        </Text>
                    )}
                </div>
                <div className='flex flex-wrap items-center justify-between gap-3'>
                    <span className='flex min-w-0 items-center gap-2'>
                        <MapPin
                            className='size-4 shrink-0 text-accent-text'
                            aria-hidden
                        />
                        <Text
                            as='span'
                            variant='small'
                            tone='secondary'>
                            {venueName || city}
                        </Text>
                    </span>
                    {!past && (
                        <Button
                            asChild
                            size='sm'>
                            <span>{open ? EVENT_FORMATS[format].cta : EVENTS_AGENDA.details}</span>
                        </Button>
                    )}
                </div>
            </div>
        </article>
    )
}
