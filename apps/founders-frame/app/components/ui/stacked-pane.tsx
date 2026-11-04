import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export interface StackedPaneProps extends HTMLAttributes<HTMLDivElement> {
    active: boolean
}

export function StackedPane({ active, className, ...props }: StackedPaneProps) {
    return (
        <div
            className={cn(
                'col-start-1 row-start-1',
                active ? 'visible motion-safe:animate-pane-in' : 'invisible',
                className,
            )}
            {...props}
        />
    )
}
