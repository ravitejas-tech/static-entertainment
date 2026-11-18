import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { SEAT_STATUS_LABELS } from '~/data/events/status'
import { CHECKOUT_COPY } from '~/data/registration/form'
import { formatEventDay, formatRupees } from '~/lib/format'
import type { RegistrationOption as Option } from '~/types/events'

export function RegistrationOption({ option }: { option: Option }) {
    const { name, description, price, status, opensAt, max } = option
    const statusLabel =
        status === 'opens-later' && opensAt
            ? EVENT_PAGE_COPY.registration.opens(formatEventDay(opensAt))
            : SEAT_STATUS_LABELS[status]

    return (
        <li className='flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0'>
            <div className='min-w-0 space-y-1'>
                <Text variant='strong'>{name}</Text>
                {description && (
                    <Text
                        variant='small'
                        tone='secondary'>
                        {description}
                    </Text>
                )}
                {max > 0 && (
                    <Text
                        variant='badge'
                        tone='muted'>
                        {CHECKOUT_COPY.tickets.perOrder(max)}
                    </Text>
                )}
                {status !== 'open' && (
                    <Badge
                        tone={status === 'few-left' ? 'sand' : 'outline'}
                        className='mt-1'>
                        {statusLabel}
                    </Badge>
                )}
            </div>
            <Text
                variant='subtitle'
                className='shrink-0 tabular-nums'>
                {formatRupees(price)}
            </Text>
        </li>
    )
}
