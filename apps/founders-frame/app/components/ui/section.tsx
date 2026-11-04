import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Container } from '~/components/ui/container'
import { sectionTitleId } from '~/data/layout/landmarks'
import { cn } from '~/lib/utils'

const sectionVariants = cva('relative scroll-mt-20 overflow-x-clip', {
    variants: {
        surface: {
            plain: '',
            muted: 'border-y border-border bg-surface-muted',
            ink: 'bg-ink text-ivory',
        },
        spacing: {
            regular: 'py-14 md:py-24',
            compact: 'py-10 md:py-16',
        },
    },
    defaultVariants: { surface: 'plain', spacing: 'regular' },
})

export interface SectionProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {}

export function Section({ id, surface, spacing, className, children, ...props }: SectionProps) {
    return (
        <section
            id={id}
            aria-labelledby={id && sectionTitleId(id)}
            className={cn(sectionVariants({ surface, spacing }), className)}
            {...props}>
            <Container>{children}</Container>
        </section>
    )
}
