import { cva, type VariantProps } from 'class-variance-authority'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

const badgeVariants = cva('inline-flex h-6 w-fit shrink-0 items-center rounded-md px-2', {
    variants: {
        tone: {
            green: 'bg-tint-green text-tint-green-text',
            navy: 'bg-tint-navy text-tint-navy-text',
            gold: 'bg-tint-gold text-tint-gold-text',
            sand: 'bg-tint-sand text-tint-sand-text',
            lavender: 'bg-tint-lavender text-tint-lavender-text',
            blue: 'bg-tint-blue text-tint-blue-text',
            neutral: 'bg-tint-neutral text-tint-neutral-text',
            red: 'bg-tint-red text-tint-red-text',
            outline: 'border border-border text-text-secondary',
        },
    },
    defaultVariants: { tone: 'neutral' },
})

export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>['tone']>

export interface BadgeProps {
    tone?: BadgeTone
    children: string
    className?: string
}

export function Badge({ tone, children, className }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ tone }), className)}>
            <Text
                as='span'
                variant='badge'>
                {children}
            </Text>
        </span>
    )
}
