import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface DetailBlockProps {
    title: string
    children: ReactNode
}

export function DetailBlock({ title, children }: DetailBlockProps) {
    return (
        <section className='space-y-4 border-t border-border pt-8 first:border-t-0 first:pt-0'>
            <Text
                as='h2'
                variant='title'>
                {title}
            </Text>
            {children}
        </section>
    )
}
