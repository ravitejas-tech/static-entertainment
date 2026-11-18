import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface SubsectionProps {
    title: string
    children: ReactNode
    className?: string
}

export function Subsection({ title, children, className }: SubsectionProps) {
    return (
        <section className={cn('space-y-3', className)}>
            <Text
                as='h3'
                variant='label'>
                {title}
            </Text>
            {children}
        </section>
    )
}
