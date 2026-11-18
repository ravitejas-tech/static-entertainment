import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { HeroHeadline } from '~/components/landing/hero-headline'
import { Button } from '~/components/ui/button'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { Typewriter } from '~/components/ui/typewriter'
import { HERO } from '~/data/landing/hero'
import { PATHS, PRIMARY_CTA_LABEL, SECTION_IDS, sectionHref } from '~/data/navigation'
import { cn } from '~/lib/utils'

export function HeroCopy({ className }: { className?: string }) {
    return (
        <div className={cn('space-y-6 md:space-y-8', className)}>
            <Text
                variant='meta'
                tone='muted'>
                {HERO.eyebrow}{' '}
                <Typewriter
                    words={HERO.audiences}
                    tone='accent'
                    className='block sm:inline'
                />
            </Text>
            <HeroHeadline />
            <Reveal
                trigger='load'
                order={4}
                className='space-y-7 md:space-y-8'>
                <div className='max-w-xl border-l-2 border-gold pl-5'>
                    <Text
                        variant='lead'
                        tone='secondary'>
                        {HERO.lead}
                    </Text>
                </div>
                <div className='grid gap-3 sm:flex sm:items-center sm:gap-6'>
                    <Button asChild>
                        <Link to={PATHS.events}>
                            {PRIMARY_CTA_LABEL}
                            <ArrowUpRight aria-hidden />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant='ghost'>
                        <Link to={sectionHref(SECTION_IDS.formats)}>{HERO.secondary}</Link>
                    </Button>
                </div>
            </Reveal>
        </div>
    )
}
