import { cn } from '~/lib/utils'

export interface JourneyProgressProps {
    count: number
    active: number
    onDone: () => void
}

export function JourneyProgress({ count, active, onDone }: JourneyProgressProps) {
    return (
        <div
            aria-hidden
            className='flex w-64 gap-1.5 sm:w-68'>
            {Array.from({ length: count }, (_, index) => (
                <span
                    key={index}
                    className='h-1 flex-1 overflow-clip rounded-full bg-ivory/25'>
                    {index <= active && (
                        <span
                            onAnimationEnd={index === active ? onDone : undefined}
                            className={cn(
                                'block h-full origin-left bg-gold',
                                index === active && 'motion-safe:animate-step-progress',
                            )}
                        />
                    )}
                </span>
            ))}
        </div>
    )
}
