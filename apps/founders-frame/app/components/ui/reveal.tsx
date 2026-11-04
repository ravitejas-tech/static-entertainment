import type { CSSProperties, HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

const EFFECT_CLASSES = {
    fade: {
        scroll: 'motion-safe:animate-reveal',
        load: 'motion-safe:animate-rise',
    },
    lift: {
        scroll: 'motion-safe:animate-lift',
        load: 'motion-safe:animate-lift-load',
    },
} as const

export interface RevealProps extends HTMLAttributes<HTMLDivElement> {
    order?: number
    trigger?: 'scroll' | 'load'
    effect?: keyof typeof EFFECT_CLASSES
}

export function Reveal({ order = 0, trigger = 'scroll', effect = 'fade', className, style, ...props }: RevealProps) {
    return (
        <div
            className={cn(EFFECT_CLASSES[effect][trigger], className)}
            style={{ ...style, '--reveal-order': order } as CSSProperties}
            {...props}
        />
    )
}
