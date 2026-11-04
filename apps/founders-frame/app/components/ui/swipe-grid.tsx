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

export interface SwipeGridProps extends VariantProps<typeof swipeGridVariants> {
    children: ReactNode
    className?: string
}

export function SwipeGrid({ columns, children, className }: SwipeGridProps) {
    return (
        <div className={cn(swipeGridVariants({ columns }), className)}>
            {Children.map(children, (child) => (
                <div className='w-5/6 shrink-0 snap-center sm:w-auto'>{child}</div>
            ))}
        </div>
    )
}
