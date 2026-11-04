import { StackedPane } from '~/components/ui/stacked-pane'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface CaptionItem {
    title: string
    body: string
}

export interface StackedCaptionProps {
    items: readonly CaptionItem[]
    chosen: number
    className?: string
}

export function StackedCaption({ items, chosen, className }: StackedCaptionProps) {
    return (
        <div className={cn('grid rounded-2xl border border-border bg-surface p-5', className)}>
            {items.map((item, index) => (
                <StackedPane
                    key={item.title}
                    active={index === chosen}
                    className='space-y-1.5'>
                    <Text variant='subtitle'>{item.title}</Text>
                    <Text
                        variant='small'
                        tone='secondary'>
                        {item.body}
                    </Text>
                </StackedPane>
            ))}
        </div>
    )
}
