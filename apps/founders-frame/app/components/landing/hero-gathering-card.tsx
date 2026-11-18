import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { Link } from 'react-router'
import { PriceBadge } from '~/components/events/price-badge'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { HERO } from '~/data/landing/hero'
import { PATHS, eventPath } from '~/data/navigation'
import { formatEventDay } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { EventSummary } from '~/types/events'

export interface HeroGatheringCardProps {
    event: EventSummary | undefined
    className?: string
}

export function HeroGatheringCard({ event, className }: HeroGatheringCardProps) {
    return (
        <Reveal
            trigger='load'
            order={5}
            className={cn('relative z-10', className)}>
            <Link
                to={event ? eventPath(event.slug) : PATHS.events}
                className='group flex h-full flex-col justify-between gap-5 rounded-2xl xl:motion-safe:animate-parallax-up bg-gold p-5 text-ink shadow-dialog transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:p-6'>
                <span className='flex items-start justify-between'>
                    <span className='flex items-center gap-3'>
                        <span className='grid size-11 place-items-center rounded-xl bg-ink/10'>
                            <CalendarDays
                                className='size-5'
                                aria-hidden
                            />
                        </span>
                        {event && <PriceBadge price={event.fromPrice} />}
                    </span>
                    <ArrowUpRight
                        className='size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none'
                        aria-hidden
                    />
                </span>
                <span className='space-y-1.5'>
                    <Text
                        as='span'
                        variant='meta'
                        tone='inherit'
                        className='block'>
                        {HERO.next.eyebrow}
                    </Text>
                    <Text
                        as='span'
                        variant='title'
                        tone='inherit'
                        className='block'>
                        {event ? event.title : HERO.next.empty}
                    </Text>
                    <Text
                        as='span'
                        variant='small'
                        tone='inherit'
                        className='block'>
                        {event ? (
                            <>
                                <time dateTime={event.startsAt}>{formatEventDay(event.startsAt)}</time> ·{' '}
                                {event.venueName || event.city}
                            </>
                        ) : (
                            HERO.next.emptyCta
                        )}
                    </Text>
                </span>
            </Link>
        </Reveal>
    )
}
