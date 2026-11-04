import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'
import type { JourneyPayMethod } from '~/types/landing'

export interface JourneyPayMethodRowProps extends JourneyPayMethod {
    chosen: boolean
}

export function JourneyPayMethodRow({ label, icon: Icon, chosen }: JourneyPayMethodRowProps) {
    return (
        <li className='flex items-center gap-3 px-3 py-2.5'>
            <Icon
                aria-hidden
                className='size-4 shrink-0 text-accent-text'
            />
            <Text
                as='span'
                variant='label'
                className='flex-1'>
                {label}
            </Text>
            <span className={cn('size-4 rounded-full', chosen ? 'border-4 border-accent' : 'border border-border')} />
        </li>
    )
}
