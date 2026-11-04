import type { ButtonHTMLAttributes, Ref } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const buttonVariants = cva(
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-5 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                primary: 'bg-accent text-accent-foreground hover:bg-accent-hover',
                secondary: 'border border-border bg-surface text-text-primary hover:bg-surface-muted',
                gold: 'bg-gold text-ink hover:bg-gold/90',
                ghost: 'text-accent-text hover:underline hover:underline-offset-4',
                inverse: 'border border-ivory/30 bg-ivory/10 text-ivory backdrop-blur-sm hover:bg-ivory/20',
            },
            size: {
                sm: 'h-10 px-4 text-sm',
                md: 'h-12 px-6 text-base',
                icon: 'size-10',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md' },
    },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
    ref?: Ref<HTMLButtonElement>
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
    const Component = asChild ? Slot : 'button'
    return (
        <Component
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    )
}
