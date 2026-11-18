import { Children, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const swipeGridVariants = cva(
    '-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-1 pb-6 scrollbar-none sm:mx-0 sm:grid sm:gap-6 sm:overflow-visible sm:p-0',
    {
        variants: {
            columns: {
                three: 'sm:grid-cols-2 lg:grid-cols-3',
                two: 'sm:grid-cols-2',
            },
        },
        defaultVariants: { columns: 'three' },
    },
)

const FILL_SPANS = {
    sm: ['sm:col-span-2', ''],
    lg: ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-1'],
} as const

const fillSpan = (count: number, columns: 'two' | 'three') =>
    cn(FILL_SPANS.sm[(count - 1) % 2], columns === 'three' && FILL_SPANS.lg[(count - 1) % 3])

export interface SwipeGridProps extends VariantProps<typeof swipeGridVariants> {
    children: ReactNode
    fillRow?: boolean
    className?: string
}

export function SwipeGrid({ columns, children, fillRow = false, className }: SwipeGridProps) {
    const count = Children.count(children)

    return (
        <div className={cn(swipeGridVariants({ columns }), className)}>
            {Children.map(children, (child, index) => (
                <div
                    className={cn(
                        'w-5/6 shrink-0 snap-center sm:w-auto',
                        fillRow && index === count - 1 && fillSpan(count, columns ?? 'three'),
                    )}>
                    {child}
                </div>
            ))}
        </div>
    )
}
