import { QrCode } from 'lucide-react'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'

export function TicketNote() {
    return (
        <div className='flex items-center gap-2 text-text-muted'>
            <QrCode
                aria-hidden
                className='size-4 shrink-0'
            />
            <Text
                variant='small'
                tone='muted'>
                {EVENT_PAGE_COPY.registration.note}
            </Text>
        </div>
    )
}
