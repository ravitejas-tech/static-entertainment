import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cva, type VariantProps } from 'class-variance-authority'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

const anchorLinkVariants = cva(
    'rounded-md underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    {
        variants: {
            layout: {
                nav: 'inline-flex min-h-10 items-center px-1 text-text-secondary hover:text-text-primary',
                inline: 'text-accent-text underline hover:text-accent-hover',
                list: 'inline-flex min-h-10 items-center gap-2 text-text-secondary hover:text-text-primary hover:underline [&_svg]:size-4 [&_svg]:shrink-0',
                overlay:
                    'inline-flex min-h-10 items-center gap-2 text-ivory/85 hover:text-ivory hover:underline focus-visible:outline-gold [&_svg]:size-4 [&_svg]:shrink-0',
                block: 'block rounded-lg px-4 py-3 hover:bg-surface-muted',
                arrow: 'inline-flex items-center gap-1.5 text-accent-text hover:underline [&_svg]:size-4 [&_svg]:shrink-0',
            },
        },
        defaultVariants: { layout: 'inline' },
    },
)

export interface AnchorLinkProps extends Omit<LinkProps, 'children'>, VariantProps<typeof anchorLinkVariants> {
    children: string
    icon?: ReactNode
    trailingIcon?: ReactNode
}

export function AnchorLink({ layout, children, icon, trailingIcon, className, ...props }: AnchorLinkProps) {
    return (
        <Link
            className={cn(anchorLinkVariants({ layout }), className)}
            {...props}>
            {icon}
            <Text
                as='span'
                variant={layout === 'block' ? 'subtitle' : 'label'}
                tone='inherit'>
                {children}
            </Text>
            {trailingIcon}
        </Link>
    )
}
