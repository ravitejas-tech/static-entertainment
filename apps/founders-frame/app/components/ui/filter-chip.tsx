import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface FilterChipProps {
    label: string
    count: number
    pressed: boolean
    onPress: () => void
}

export function FilterChip({ label, count, pressed, onPress }: FilterChipProps) {
    return (
        <button
            type='button'
            aria-pressed={pressed}
            onClick={onPress}
            className={cn(
                'inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                pressed
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-border bg-surface text-text-secondary hover:bg-surface-muted',
            )}>
            <Text
                as='span'
                variant='label'
                tone='inherit'>
                {label}
            </Text>
            <Text
                as='span'
                variant='badge'
                tone={pressed ? 'inverse-muted' : 'muted'}>
                {count}
            </Text>
        </button>
    )
}
