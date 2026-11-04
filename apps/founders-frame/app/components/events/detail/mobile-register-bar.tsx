import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { bookPath } from '~/data/navigation'
import { formatEventDay, formatEventTime, formatRupees } from '~/lib/format'
import type { EventDetail } from '~/types/events'

export function MobileRegisterBar({ event }: { event: EventDetail }) {
    return (
        <div className='fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface px-4 py-3 shadow-dialog lg:hidden'>
            <div className='flex items-center justify-between gap-4'>
                <div className='min-w-0'>
                    {event.fromPrice !== null && (
                        <Text variant='subtitle'>{EVENT_CARD_COPY.from(formatRupees(event.fromPrice))}</Text>
                    )}
                    <Text
                        variant='badge'
                        tone='muted'>
                        {EVENT_PAGE_COPY.when(formatEventDay(event.startsAt), formatEventTime(event.startsAt))}
                    </Text>
                </div>
                <Button asChild>
                    <Link to={bookPath(event.slug)}>{EVENT_CARD_COPY.book}</Link>
                </Button>
            </div>
        </div>
    )
}
