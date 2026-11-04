import { useState, type FocusEvent, type PointerEvent } from 'react'

export function useStepCycle(count: number) {
    const [active, setActive] = useState(0)
    const [hovering, setHovering] = useState(false)
    const [focused, setFocused] = useState(false)

    const advance = () => setActive((step) => (step + 1) % count)

    const pauseControls = {
        onPointerEnter: (event: PointerEvent) => {
            if (event.pointerType === 'mouse') setHovering(true)
        },
        onPointerLeave: (event: PointerEvent) => {
            if (event.pointerType === 'mouse') setHovering(false)
        },
        onFocus: (event: FocusEvent) => {
            if (event.target.matches(':focus-visible')) setFocused(true)
        },
        onBlur: (event: FocusEvent<HTMLElement>) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
        },
    }

    return { active, select: setActive, advance, paused: hovering || focused, pauseControls }
}
