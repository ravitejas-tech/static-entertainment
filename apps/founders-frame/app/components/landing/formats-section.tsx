import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { JourneyStage } from '~/components/landing/journey/stage'
import { JourneyStepList } from '~/components/landing/journey/step-list'
import { JourneyTabs } from '~/components/landing/journey/tabs'
import { Button } from '~/components/ui/button'
import { Reveal } from '~/components/ui/reveal'
import { RiseHeading } from '~/components/ui/rise-heading'
import { Section } from '~/components/ui/section'
import { StackedCaption } from '~/components/ui/stacked-caption'
import { FORMATS_CTA, FORMATS_HEADING, JOURNEY_STEPS } from '~/data/landing/formats'
import { PATHS, SECTION_IDS } from '~/data/navigation'
import { useStepCycle } from '~/hooks/use-step-cycle'
import { cn } from '~/lib/utils'

export function FormatsSection() {
    const { active, select, advance, paused, pauseControls } = useStepCycle(JOURNEY_STEPS.length)

    return (
        <Section
            id={SECTION_IDS.formats}
            surface='muted'>
            <div
                {...pauseControls}
                className={cn(
                    'flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16',
                    paused && 'motion-paused',
                )}>
                <div className='contents lg:flex lg:flex-col lg:gap-8'>
                    <RiseHeading
                        sectionId={SECTION_IDS.formats}
                        className='mb-2 md:mb-2 lg:mb-0'
                        {...FORMATS_HEADING}
                    />
                    <Reveal
                        order={5}
                        className='lg:hidden'>
                        <JourneyTabs
                            steps={JOURNEY_STEPS}
                            active={active}
                            onSelect={select}
                        />
                    </Reveal>
                    <StackedCaption
                        items={JOURNEY_STEPS}
                        chosen={active}
                        className='lg:hidden'
                    />
                    <Reveal
                        order={5}
                        className='hidden lg:block'>
                        <JourneyStepList
                            steps={JOURNEY_STEPS}
                            active={active}
                            onSelect={select}
                        />
                    </Reveal>
                    <Reveal
                        order={6}
                        className='order-last lg:order-none'>
                        <Button
                            asChild
                            className='w-full sm:w-fit'>
                            <Link to={PATHS.events}>
                                {FORMATS_CTA}
                                <ArrowRight aria-hidden />
                            </Link>
                        </Button>
                    </Reveal>
                </div>
                <JourneyStage
                    count={JOURNEY_STEPS.length}
                    active={active}
                    onStepDone={advance}
                />
            </div>
        </Section>
    )
}
