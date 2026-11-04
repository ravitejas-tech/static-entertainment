import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const cardVariants = cva('rounded-xl border border-border', {
    variants: {
        tone: {
            surface: 'bg-surface',
            muted: 'bg-surface-muted',
        },
        padding: {
            none: '',
            sm: 'p-4',
            md: 'p-5 sm:p-6',
            lg: 'p-6 sm:p-8',
        },
        interactive: {
            true: 'transition duration-200 ease-out hover:border-accent/50 hover:shadow-card motion-safe:hover:-translate-y-0.5',
        },
        elevated: { true: 'shadow-card' },
        floating: { true: 'rounded-2xl border-transparent shadow-dialog' },
    },
    defaultVariants: { tone: 'surface', padding: 'md' },
})

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ tone, padding, interactive, elevated, floating, className, ...props }: CardProps) {
    return (
        <div
            className={cn(cardVariants({ tone, padding, interactive, elevated, floating }), className)}
            {...props}
        />
    )
}
