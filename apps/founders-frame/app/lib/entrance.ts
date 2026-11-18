import { ENTRANCE_ROOT_MARGIN, REDUCED_MOTION_QUERY } from '~/data/ui/motion'

const STATE = 'data-entered'

let observer: IntersectionObserver | undefined

function settle(entries: IntersectionObserverEntry[], entrances: IntersectionObserver) {
    for (const { target, isIntersecting, boundingClientRect } of entries) {
        const waiting = target.getAttribute(STATE) === 'waiting'
        if (isIntersecting || (!waiting && boundingClientRect.top < window.innerHeight)) {
            if (waiting) target.setAttribute(STATE, 'playing')
            entrances.unobserve(target)
        } else if (!waiting) {
            target.setAttribute(STATE, 'waiting')
        }
    }
}

function entranceObserver() {
    observer ??= new IntersectionObserver(settle, { rootMargin: ENTRANCE_ROOT_MARGIN })
    return observer
}

export function observeEntrance(node: Element | null) {
    if (!node || window.matchMedia(REDUCED_MOTION_QUERY).matches) return
    const entrances = entranceObserver()
    entrances.observe(node)
    return () => entrances.unobserve(node)
}
