import type { CSSProperties, HTMLAttributes } from 'react'
import { observeEntrance } from '~/lib/entrance'
import { cn } from '~/lib/utils'

const EFFECT_CLASSES = {
    fade: {
        scroll: 'motion-safe:animate-reveal',
        load: 'motion-safe:animate-rise',
        'load-lg': 'motion-safe:animate-reveal lg:motion-safe:animate-rise',
    },
    lift: {
        scroll: 'motion-safe:animate-lift',
        load: 'motion-safe:animate-lift-load',
        'load-lg': 'motion-safe:animate-lift lg:motion-safe:animate-lift-load',
    },
} as const

export type RevealTrigger = keyof (typeof EFFECT_CLASSES)['fade']

export interface RevealProps extends HTMLAttributes<HTMLDivElement> {
    order?: number
    trigger?: RevealTrigger
    effect?: keyof typeof EFFECT_CLASSES
}

export function Reveal({ order = 0, trigger = 'scroll', effect = 'fade', className, style, ...props }: RevealProps) {
    return (
        <div
            ref={trigger === 'load' ? undefined : observeEntrance}
            className={cn(EFFECT_CLASSES[effect][trigger], className)}
            style={{ ...style, '--reveal-order': order } as CSSProperties}
            {...props}
        />
    )
}
