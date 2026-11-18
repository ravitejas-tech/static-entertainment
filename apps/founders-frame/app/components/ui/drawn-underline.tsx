import { DRAWN_UNDERLINE } from '~/data/ui/motion'
import { observeEntrance } from '~/lib/entrance'

const TRIGGER_CLASSES = {
    load: 'motion-safe:animate-draw',
    scroll: 'motion-safe:animate-draw-scroll',
} as const

export interface DrawnUnderlineProps {
    trigger?: keyof typeof TRIGGER_CLASSES
}

export function DrawnUnderline({ trigger = 'load' }: DrawnUnderlineProps) {
    return (
        <svg
            ref={trigger === 'scroll' ? observeEntrance : undefined}
            viewBox={DRAWN_UNDERLINE.viewBox}
            preserveAspectRatio='none'
            className='pointer-events-none absolute inset-x-0 -bottom-3 h-4 w-full text-gold'
            aria-hidden>
            <path
                d={DRAWN_UNDERLINE.path}
                pathLength={1}
                fill='none'
                stroke='currentColor'
                strokeWidth={4}
                strokeLinecap='round'
                className={TRIGGER_CLASSES[trigger]}
            />
        </svg>
    )
}
