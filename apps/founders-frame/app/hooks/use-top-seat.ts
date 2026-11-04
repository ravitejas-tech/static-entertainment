import { useEffect, useState, type RefObject } from 'react'
import { ROUND_TABLE_TIMING } from '~/data/ui/motion'
import { seatAtTop, spinProgress } from '~/lib/round-table'

export function useTopSeat(ringRef: RefObject<HTMLElement | null>, count: number) {
    const [top, setTop] = useState(0)

    useEffect(() => {
        const spin = ringRef.current?.getAnimations()[0]
        if (!spin) return
        const timer = window.setInterval(() => setTop(seatAtTop(spinProgress(spin), count)), ROUND_TABLE_TIMING.poll)
        return () => window.clearInterval(timer)
    }, [ringRef, count])

    return top
}
