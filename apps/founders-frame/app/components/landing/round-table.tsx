import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react'
import { TableSeat } from '~/components/landing/table-seat'
import { TableTop } from '~/components/landing/table-top'
import { StackedCaption } from '~/components/ui/stacked-caption'
import { ROUND_TABLE_TIMING } from '~/data/ui/motion'
import { useTopSeat } from '~/hooks/use-top-seat'
import { cn } from '~/lib/utils'
import type { AudienceGroup } from '~/types/landing'

export interface RoundTableProps {
    groups: AudienceGroup[]
    className?: string
}

export function RoundTable({ groups, className }: RoundTableProps) {
    const ringRef = useRef<HTMLDivElement>(null)
    const resumeTimer = useRef<number | undefined>(undefined)
    const top = useTopSeat(ringRef, groups.length)
    const [picked, setPicked] = useState<number | null>(null)
    const [hovering, setHovering] = useState(false)
    const shown = picked ?? top

    useEffect(() => () => window.clearTimeout(resumeTimer.current), [])

    const hold = (index: number) => {
        window.clearTimeout(resumeTimer.current)
        setPicked(index)
    }
    const pick = (index: number) => {
        hold(index)
        if (!hovering) resumeTimer.current = window.setTimeout(() => setPicked(null), ROUND_TABLE_TIMING.resumeAfterTap)
    }
    const pauseForMouse = (event: PointerEvent) => {
        if (event.pointerType === 'mouse') setHovering(true)
    }
    const resumeAfterMouse = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        setHovering(false)
        setPicked(null)
    }
    const resumeAfterFocus = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPicked(null)
    }

    return (
        <div className={cn('flex flex-col gap-6', className)}>
            <div
                onPointerEnter={pauseForMouse}
                onPointerLeave={resumeAfterMouse}
                onBlur={resumeAfterFocus}
                className={cn(
                    'relative mx-auto aspect-square w-full max-w-2xl',
                    (hovering || picked !== null) && 'motion-paused',
                )}>
                <TableTop
                    groups={groups}
                    chosen={shown}
                />
                <div
                    ref={ringRef}
                    className='absolute inset-0 motion-safe:animate-orbit'>
                    {groups.map((group, index) => (
                        <TableSeat
                            key={group.type}
                            group={group}
                            index={index}
                            count={groups.length}
                            chosen={index === shown}
                            onHold={() => hold(index)}
                            onPick={() => pick(index)}
                        />
                    ))}
                </div>
            </div>
            <StackedCaption
                items={groups}
                chosen={shown}
                className='sm:hidden'
            />
        </div>
    )
}
