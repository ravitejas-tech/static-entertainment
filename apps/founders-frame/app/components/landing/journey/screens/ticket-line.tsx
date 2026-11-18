import { Minus, Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { formatRupees } from '~/lib/format'
import type { JourneyLine } from '~/types/landing'

export function JourneyTicketLine({ name, price, quantity }: JourneyLine) {
    return (
        <li className='flex items-center justify-between gap-2 rounded-lg border border-accent bg-tint-navy px-3 py-2.5'>
            <div className='min-w-0'>
                <Text variant='label'>{name}</Text>
                <Text
                    variant='badge'
                    tone='accent'>
                    {formatRupees(price)}
                </Text>
            </div>
            <div className='flex shrink-0 items-center gap-1.5'>
                <Button
                    asChild
                    variant='secondary'
                    size='icon-sm'>
                    <span>
                        <Minus aria-hidden />
                    </span>
                </Button>
                <Text
                    as='span'
                    variant='label'
                    className='w-4 text-center'>
                    {quantity}
                </Text>
                <Button
                    asChild
                    variant='secondary'
                    size='icon-sm'>
                    <span>
                        <Plus aria-hidden />
                    </span>
                </Button>
            </div>
        </li>
    )
}
