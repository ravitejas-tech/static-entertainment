import { CalendarDays } from 'lucide-react'
import { Link } from 'react-router'
import { EventCover } from '~/components/events/event-cover'
import { FormatBadge } from '~/components/events/format-badge'
import { PanelFrame } from '~/components/landing/panel-frame'
import { PanelTab } from '~/components/landing/panel-tab'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { EVENT_FORMATS } from '~/data/events/formats'
import { HOME_EVENTS_PANELS } from '~/data/landing/events'
import { eventPath } from '~/data/navigation'
import { PHOTO_SIZES } from '~/data/ui/media'
import { formatDateBadge, formatEventDay, formatTimeRange } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export interface EventPanelProps {
    event: EventSummary
    order: number
    first: boolean
    priority?: boolean
    open: boolean
    onOpen: () => void
}

export function EventPanel({ event, order, first, priority = false, open, onOpen }: EventPanelProps) {
    const { slug, title, categoryLabel, format, summary, startsAt, endsAt, venueName, city, photo } = event
    const { day, month } = formatDateBadge(startsAt)

    return (
        <PanelFrame
            order={order}
            open={open}
            onOpen={onOpen}
            backdrop={
                <EventCover
                    cover={photo}
                    priority={priority}
                    sizes={PHOTO_SIZES.cover}
                    className='aspect-auto h-full rounded-none'
                />
            }
            tab={
                <PanelTab
                    title={title}
                    marker={
                        <span className='w-10 shrink-0 text-center'>
                            <Text
                                as='span'
                                variant='stat'
                                tone='inverse'
                                className='block'>
                                {day}
                            </Text>
                            <Text
                                as='span'
                                variant='meta'
                                tone='inherit'
                                className='mt-1 block text-gold'>
                                {month}
                            </Text>
                        </span>
                    }
                />
            }>
            <div className='flex h-full flex-col justify-between p-5 sm:p-7 lg:p-8'>
                <div className='flex flex-wrap items-center gap-2'>
                    <span className='inline-flex h-8 items-center gap-2 rounded-full border border-ivory/30 bg-ivory/15 px-3 text-ivory backdrop-blur-sm'>
                        <CalendarDays
                            className='size-4'
                            aria-hidden
                        />
                        <Text
                            as='span'
                            variant='badge'
                            tone='inherit'
                            className='font-semibold'>
                            <time dateTime={startsAt}>{formatEventDay(startsAt)}</time>
                        </Text>
                    </span>
                    <FormatBadge format={format} />
                    {!event.open && <Badge tone='neutral'>{EVENT_CARD_COPY.closed}</Badge>}
                </div>
                <div className='max-w-xl space-y-3'>
                    <Text
                        variant='meta'
                        tone='inherit'
                        className='text-gold'>
                        {first ? `${categoryLabel} · ${HOME_EVENTS_PANELS.nextUp}` : categoryLabel}
                    </Text>
                    <Text
                        as='h3'
                        variant='heading'
                        tone='inverse'
                        className='xl:text-5xl/tight'>
                        <Link
                            to={eventPath(slug)}
                            className='after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-gold'>
                            {title}
                        </Link>
                    </Text>
                    {summary && (
                        <Text
                            tone='inverse-muted'
                            className='hidden max-w-lg sm:line-clamp-2'>
                            {summary}
                        </Text>
                    )}
                    <Text
                        variant='small'
                        tone='inverse-muted'>
                        {formatTimeRange(startsAt, endsAt)} · {venueName || city}
                    </Text>
                    <Button
                        asChild
                        variant='gold'
                        className='mt-2 w-full sm:w-auto'>
                        <span>{event.open ? EVENT_FORMATS[format].cta : HOME_EVENTS_PANELS.details}</span>
                    </Button>
                </div>
            </div>
        </PanelFrame>
    )
}
