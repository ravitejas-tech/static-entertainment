import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Text } from '~/components/ui/text'

export interface IconTextProps {
    icon: LucideIcon
    children: ReactNode
    detail?: string
    action?: ReactNode
}

export function IconText({ icon: Icon, children, detail, action }: IconTextProps) {
    return (
        <div className='flex items-start gap-3'>
            <Icon
                className='mt-0.5 size-5 shrink-0 text-accent-text'
                aria-hidden
            />
            <div className='min-w-0 space-y-0.5'>
                <Text variant='label'>{children}</Text>
                {detail && (
                    <Text
                        variant='small'
                        tone='secondary'>
                        {detail}
                    </Text>
                )}
                {action}
            </div>
        </div>
    )
}
