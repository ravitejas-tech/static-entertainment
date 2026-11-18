import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

const noticeVariants = cva('flex items-start gap-3 rounded-lg p-4', {
    variants: {
        tone: {
            neutral: 'border border-border bg-surface text-text-secondary',
            info: 'bg-tint-blue text-tint-blue-text',
            success: 'bg-tint-green text-tint-green-text',
            warning: 'bg-tint-sand text-tint-sand-text',
            danger: 'bg-tint-red text-tint-red-text',
        },
    },
    defaultVariants: { tone: 'neutral' },
})

export interface NoticeProps extends VariantProps<typeof noticeVariants> {
    icon: LucideIcon
    title: string
    body?: string
    live?: 'polite' | 'assertive'
    action?: ReactNode
    className?: string
}

export function Notice({ icon: Icon, title, body, tone, live, action, className }: NoticeProps) {
    return (
        <div
            role={live === 'assertive' ? 'alert' : live && 'status'}
            className={cn(noticeVariants({ tone }), className)}>
            <Icon
                className='mt-0.5 size-5 shrink-0'
                aria-hidden
            />
            <div className='min-w-0 flex-1 space-y-1'>
                <Text
                    variant='label'
                    tone='inherit'>
                    {title}
                </Text>
                {body && (
                    <Text
                        variant='small'
                        tone='inherit'>
                        {body}
                    </Text>
                )}
                {action}
            </div>
        </div>
    )
}
