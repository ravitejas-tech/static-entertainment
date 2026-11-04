import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const controlFrameVariants = cva(
    'relative flex items-center overflow-hidden rounded-lg border bg-surface transition-colors focus-within:border-accent focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline-accent/30',
    {
        variants: {
            invalid: { true: 'border-danger', false: 'border-border' },
            multiline: { true: 'items-stretch', false: 'h-12' },
        },
        defaultVariants: { invalid: false, multiline: false },
    },
)

export interface ControlFrameProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof controlFrameVariants> {}

export function ControlFrame({ invalid, multiline, className, ...props }: ControlFrameProps) {
    return (
        <div
            className={cn(controlFrameVariants({ invalid, multiline }), className)}
            {...props}
        />
    )
}
