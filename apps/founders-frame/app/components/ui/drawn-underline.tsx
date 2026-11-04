import { DRAWN_UNDERLINE } from '~/data/ui/motion'

export function DrawnUnderline() {
    return (
        <svg
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
                className='motion-safe:animate-draw'
            />
        </svg>
    )
}
