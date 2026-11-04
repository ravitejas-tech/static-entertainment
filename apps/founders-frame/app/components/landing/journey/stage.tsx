import { JourneyPhone } from '~/components/landing/journey/phone'
import { JourneyProgress } from '~/components/landing/journey/progress'
import { Photo } from '~/components/ui/photo'
import { Reveal } from '~/components/ui/reveal'
import { JOURNEY_PHOTOS } from '~/data/landing/images'
import { PHOTO_SIZES } from '~/data/ui/media'
import { observeEntrance } from '~/lib/entrance'
import { cn } from '~/lib/utils'

export interface JourneyStageProps {
    count: number
    active: number
    onStepDone: () => void
    className?: string
}

export function JourneyStage({ count, active, onStepDone, className }: JourneyStageProps) {
    return (
        <div
            ref={observeEntrance}
            className={cn(
                'relative isolate flex flex-col items-center gap-6 overflow-clip rounded-xl px-4 py-10 motion-safe:animate-clip-reveal sm:py-14',
                className,
            )}>
            <Photo
                photo={{ ...JOURNEY_PHOTOS.stage, alt: '' }}
                sizes={PHOTO_SIZES.half}
                className='absolute inset-0 -z-20 motion-safe:animate-settle'
            />
            <div className='absolute inset-0 -z-10 bg-ink/60' />
            <div className='relative grid place-items-center'>
                <div
                    aria-hidden
                    className='absolute top-1/2 left-1/2 hidden size-120 -translate-1/2 rounded-full border border-dashed border-gold/70 motion-safe:animate-orbit sm:block'
                />
                <Reveal
                    effect='lift'
                    className='relative'>
                    <JourneyPhone active={active} />
                </Reveal>
            </div>
            <JourneyProgress
                count={count}
                active={active}
                onDone={onStepDone}
            />
        </div>
    )
}
