import type { ReactNode } from 'react'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface EmptyStateProps {
    level?: 'h1' | 'h2' | 'h3'
    title: string
    body: string
    action?: ReactNode
    className?: string
}

export function EmptyState({ level = 'h3', title, body, action, className }: EmptyStateProps) {
    return (
        <Card
            padding='lg'
            className={cn('mx-auto max-w-2xl text-center', className)}>
            <div className='space-y-3 py-4'>
                <Text
                    as={level}
                    variant={level === 'h1' ? 'display' : 'title'}>
                    {title}
                </Text>
                <Text tone='secondary'>{body}</Text>
                {action && <div className='flex flex-wrap justify-center gap-3 pt-3'>{action}</div>}
            </div>
        </Card>
    )
}
