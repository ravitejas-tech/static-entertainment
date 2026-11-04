import { ArrowLeft } from 'lucide-react'
import { EventCover } from '~/components/events/event-cover'
import { FormatBadge } from '~/components/events/format-badge'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { PATHS } from '~/data/navigation'
import { PHOTO_SIZES } from '~/data/ui/media'
import type { EventDetail } from '~/types/events'

export function EventHeader({ event }: { event: EventDetail }) {
    return (
        <div className='space-y-8'>
            <AnchorLink
                to={PATHS.events}
                layout='list'
                icon={<ArrowLeft aria-hidden />}>
                {EVENT_PAGE_COPY.back}
            </AnchorLink>
            <div className='grid items-end gap-8 lg:grid-cols-2 lg:gap-12'>
                <div className='space-y-4'>
                    <div className='flex flex-wrap items-center gap-3'>
                        <FormatBadge format={event.format} />
                        <Text
                            as='span'
                            variant='meta'>
                            {event.categoryLabel}
                        </Text>
                    </div>
                    <Text
                        as='h1'
                        variant='display'>
                        {event.title}
                    </Text>
                    {event.summary && (
                        <Text
                            variant='lead'
                            tone='secondary'>
                            {event.summary}
                        </Text>
                    )}
                </div>
                <EventCover
                    cover={event.photo}
                    sizes={PHOTO_SIZES.cover}
                    priority
                />
            </div>
        </div>
    )
}
