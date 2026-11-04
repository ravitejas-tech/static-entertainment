import type { CSSProperties, FocusEvent, MouseEvent, PointerEvent, ReactNode } from 'react'
import { cn } from '~/lib/utils'

export interface PanelFrameProps {
    order: number
    open: boolean
    onOpen: () => void
    backdrop: ReactNode
    tab: ReactNode
    children: ReactNode
}

export function PanelFrame({ order, open, onOpen, backdrop, tab, children }: PanelFrameProps) {
    const openOnHover = (event: PointerEvent) => {
        if (event.pointerType === 'mouse') onOpen()
    }
    const openOnKeyboardFocus = (event: FocusEvent) => {
        if (event.target.matches(':focus-visible')) onOpen()
    }
    const openBeforeFollowing = (event: MouseEvent) => {
        if (open) return
        event.preventDefault()
        onOpen()
    }

    return (
        <div
            onPointerEnter={openOnHover}
            onFocus={openOnKeyboardFocus}
            onClickCapture={openBeforeFollowing}
            className={cn(
                'relative isolate shrink-0 overflow-clip rounded-3xl bg-ink transition-all duration-500 ease-settle motion-safe:animate-lift motion-reduce:transition-none lg:h-full lg:shrink lg:basis-0',
                open ? 'h-96 lg:grow-5' : 'h-19 cursor-pointer lg:grow',
            )}
            style={{ '--reveal-order': order } as CSSProperties}>
            <div className='absolute inset-0 -z-10'>{backdrop}</div>
            <div className='absolute inset-0 -z-10 bg-linear-to-t from-ink/95 via-ink/40 to-ink/10' />
            <div
                className={cn(
                    'absolute inset-0 -z-10 bg-ink/60 transition-opacity duration-500 motion-reduce:transition-none',
                    open && 'opacity-0',
                )}
            />
            <div
                aria-hidden
                className={cn(
                    'absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none',
                    open ? 'opacity-0' : 'opacity-100 delay-150',
                )}>
                {tab}
            </div>
            <div
                className={cn(
                    'absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none lg:min-w-120 xl:min-w-150 2xl:min-w-180',
                    open ? 'opacity-100 delay-200' : 'opacity-0',
                )}>
                {children}
            </div>
        </div>
    )
}
