import { Minus, Plus } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { SEAT_STATUS_LABELS } from '~/data/events/status'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { CHECKOUT_COPY } from '~/data/registration/form'
import { formatEventDay, formatRupees } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { RegistrationOption } from '~/types/events'

const { tickets } = CHECKOUT_COPY

export interface TicketRowProps {
    option: RegistrationOption
    quantity: number
    canAdd: boolean
    onChange: (delta: 1 | -1) => void
}

export function TicketRow({ option, quantity, canAdd, onChange }: TicketRowProps) {
    const { name, description, price, status, opensAt, max } = option
    const bookable = max > 0
    const statusLabel =
        status === 'opens-later' && opensAt
            ? EVENT_PAGE_COPY.registration.opens(formatEventDay(opensAt))
            : SEAT_STATUS_LABELS[status]

    return (
        <div
            className={cn(
                'flex flex-col gap-4 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-5',
                quantity > 0 ? 'border-accent bg-tint-navy' : 'border-border bg-surface',
            )}>
            <div className='min-w-0 space-y-1'>
                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                    <Text variant='strong'>{name}</Text>
                    <Text
                        as='span'
                        variant='label'
                        tone='accent'>
                        {formatRupees(price)}
                    </Text>
                </div>
                {description && (
                    <Text
                        variant='small'
                        tone='secondary'>
                        {description}
                    </Text>
                )}
                <div className='flex flex-wrap items-center gap-2 pt-1'>
                    {status !== 'open' && (
                        <Badge tone={status === 'few-left' ? 'sand' : 'outline'}>{statusLabel}</Badge>
                    )}
                    {bookable && (
                        <Text
                            as='span'
                            variant='badge'
                            tone='muted'>
                            {tickets.perOrder(max)}
                        </Text>
                    )}
                </div>
            </div>
            {bookable && (
                <div className='flex shrink-0 items-center gap-3 self-end sm:self-auto'>
                    <Button
                        type='button'
                        variant='secondary'
                        size='icon'
                        aria-label={tickets.remove(name)}
                        disabled={quantity === 0}
                        onClick={() => onChange(-1)}>
                        <Minus aria-hidden />
                    </Button>
                    <Text
                        as='span'
                        variant='stat'
                        className='w-8 text-center'
                        aria-live='polite'
                        aria-label={tickets.quantity(name)}>
                        {quantity}
                    </Text>
                    <Button
                        type='button'
                        variant='secondary'
                        size='icon'
                        aria-label={tickets.add(name)}
                        disabled={!canAdd}
                        onClick={() => onChange(1)}>
                        <Plus aria-hidden />
                    </Button>
                </div>
            )}
        </div>
    )
}
