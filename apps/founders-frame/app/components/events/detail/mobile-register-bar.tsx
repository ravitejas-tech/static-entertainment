import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { EVENT_FORMATS } from '~/data/events/formats'
import { REGISTER_ANCHOR } from '~/data/events/page'
import { formatEventDay } from '~/lib/format'
import type { EventDetail } from '~/types/events'

export function MobileRegisterBar({ event }: { event: EventDetail }) {
    return (
        <div className='fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-5 py-3 backdrop-blur-md lg:hidden'>
            <div className='flex items-center justify-between gap-4'>
                <div className='min-w-0'>
                    <Text
                        variant='label'
                        className='truncate'>
                        {event.title}
                    </Text>
                    <Text
                        variant='small'
                        tone='secondary'>
                        {formatEventDay(event.startsAt)}
                    </Text>
                </div>
                <Button
                    asChild
                    size='sm'>
                    <a href={`#${REGISTER_ANCHOR}`}>{EVENT_FORMATS[event.format].cta}</a>
                </Button>
            </div>
        </div>
    )
}
