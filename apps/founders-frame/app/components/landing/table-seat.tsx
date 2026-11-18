import type { CSSProperties, FocusEvent, PointerEvent } from 'react'
import { Photo } from '~/components/ui/photo'
import { Text } from '~/components/ui/text'
import { AUDIENCE_PHOTOS } from '~/data/landing/images'
import { PHOTO_SIZES } from '~/data/ui/media'
import { cn } from '~/lib/utils'
import type { AudienceGroup } from '~/types/landing'

export interface TableSeatProps {
    group: AudienceGroup
    index: number
    count: number
    chosen: boolean
    onHold: () => void
    onPick: () => void
}

export function TableSeat({ group, index, count, chosen, onHold, onPick }: TableSeatProps) {
    const holdOnHover = (event: PointerEvent) => {
        if (event.pointerType === 'mouse') onHold()
    }
    const holdOnKeyboardFocus = (event: FocusEvent) => {
        if (event.target.matches(':focus-visible')) onHold()
    }

    return (
        <div
            className='seat-orbit absolute flex size-0 items-center justify-center motion-safe:animate-orbit-upright'
            style={{ '--seat-index': index, '--seat-count': count } as CSSProperties}>
            <button
                type='button'
                aria-label={group.title}
                aria-pressed={chosen}
                onClick={onPick}
                onPointerEnter={holdOnHover}
                onFocus={holdOnKeyboardFocus}
                className='relative block size-16 shrink-0 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:size-20 md:size-24 lg:size-26'>
                <span
                    className={cn(
                        'block size-full overflow-clip rounded-full shadow-card ring-4 transition duration-300 motion-reduce:transition-none',
                        chosen ? 'ring-gold' : 'ring-surface',
                    )}>
                    <Photo
                        photo={{ ...AUDIENCE_PHOTOS[group.type], alt: '' }}
                        sizes={PHOTO_SIZES.seat}
                    />
                </span>
                <Text
                    as='span'
                    variant='badge'
                    className={cn(
                        'absolute inset-x-0 -bottom-3 mx-auto hidden w-fit rounded-full border px-2.5 py-1 whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none sm:block',
                        chosen ? 'border-gold bg-gold text-ink' : 'border-border bg-surface text-text-primary',
                    )}>
                    {group.name}
                </Text>
            </button>
        </div>
    )
}
