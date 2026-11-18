import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'
import type { JourneyStep } from '~/types/landing'

export interface JourneyStepListProps {
    steps: readonly JourneyStep[]
    active: number
    onSelect: (index: number) => void
}

export function JourneyStepList({ steps, active, onSelect }: JourneyStepListProps) {
    return (
        <ol className='border-t border-border'>
            {steps.map((step, index) => {
                const chosen = index === active
                return (
                    <li
                        key={step.title}
                        className='border-b border-border'>
                        <button
                            type='button'
                            aria-pressed={chosen}
                            onClick={() => onSelect(index)}
                            className='flex w-full cursor-pointer items-start gap-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'>
                            <Text
                                as='span'
                                variant='label'
                                tone={chosen ? 'on-accent' : 'accent'}
                                className={cn(
                                    'grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 motion-reduce:transition-none',
                                    chosen ? 'border-accent bg-accent' : 'border-border bg-surface',
                                )}>
                                {index + 1}
                            </Text>
                            <span className='space-y-1.5 pt-1.5'>
                                <Text
                                    as='span'
                                    variant='title'
                                    tone={chosen ? 'primary' : 'secondary'}
                                    className='block'>
                                    {step.title}
                                </Text>
                                <Text
                                    as='span'
                                    tone={chosen ? 'secondary' : 'muted'}
                                    className='block'>
                                    {step.body}
                                </Text>
                            </span>
                        </button>
                    </li>
                )
            })}
        </ol>
    )
}
