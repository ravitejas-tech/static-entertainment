import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'
import type { JourneyStep } from '~/types/landing'

export interface JourneyTabsProps {
    steps: readonly JourneyStep[]
    active: number
    onSelect: (index: number) => void
}

export function JourneyTabs({ steps, active, onSelect }: JourneyTabsProps) {
    return (
        <ol className='grid grid-cols-4 gap-1 rounded-full border border-border bg-surface p-1'>
            {steps.map((step, index) => {
                const chosen = index === active
                return (
                    <li key={step.title}>
                        <button
                            type='button'
                            aria-pressed={chosen}
                            onClick={() => onSelect(index)}
                            className={cn(
                                'min-h-11 w-full cursor-pointer rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none',
                                chosen && 'bg-ink',
                            )}>
                            <Text
                                as='span'
                                variant='label'
                                tone={chosen ? 'inverse' : 'secondary'}>
                                {step.short}
                            </Text>
                        </button>
                    </li>
                )
            })}
        </ol>
    )
}
