import { CollagePhoto } from '~/components/landing/collage-photo'
import { HeroGatheringCard } from '~/components/landing/hero-gathering-card'
import { HERO } from '~/data/landing/hero'
import { HERO_COLLAGE } from '~/data/landing/images'
import { cn } from '~/lib/utils'
import type { EventSummary } from '~/types/events'

export interface HeroCollageProps {
    featured: EventSummary | undefined
    className?: string
}

export function HeroCollage({ featured, className }: HeroCollageProps) {
    return (
        <div
            className={cn(
                'relative isolate -mx-5 grid grid-cols-12 gap-3 px-5 pt-6 md:-mx-8 md:gap-4 md:px-8 md:pt-8 xl:mx-0 xl:aspect-4/5 xl:grid-cols-2 xl:grid-rows-12 xl:gap-5 xl:p-0',
                className,
            )}>
            <div
                className='absolute inset-x-0 top-0 bottom-14 -z-10 rounded-b-4xl bg-ink xl:hidden'
                aria-hidden
            />
            <CollagePhoto
                photo={HERO_COLLAGE.speaker}
                order={1}
                priority
                className='col-span-9 col-start-1 row-start-1 aspect-4/5 md:col-span-4 xl:col-span-1 xl:col-start-1 xl:row-span-7 xl:row-start-1 xl:aspect-auto'
            />
            <CollagePhoto
                photo={HERO_COLLAGE.notes}
                order={2}
                className='z-10 col-span-5 col-start-8 row-start-1 mb-8 aspect-4/5 self-end ring-4 ring-ink md:col-span-4 md:col-start-5 md:mb-0 md:self-auto md:ring-0 xl:col-span-1 xl:col-start-2 xl:row-span-7 xl:row-start-2 xl:aspect-auto'
            />
            <CollagePhoto
                photo={HERO_COLLAGE.room}
                order={3}
                caption={HERO.collage.caption}
                className='hidden aspect-4/5 md:col-span-4 md:col-start-9 md:row-start-1 md:block xl:col-span-1 xl:col-start-2 xl:row-span-4 xl:row-start-9 xl:aspect-auto'
            />
            <HeroGatheringCard
                event={featured}
                className='col-span-12 xl:col-span-1 xl:col-start-1 xl:row-span-5 xl:row-start-8 xl:-ml-10 xl:self-start 2xl:-ml-14'
            />
        </div>
    )
}
