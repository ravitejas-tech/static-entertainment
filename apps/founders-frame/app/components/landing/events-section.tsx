import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { EventPanels } from '~/components/landing/event-panels'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { HOME_EVENTS_EMPTY, HOME_EVENTS_HEADING } from '~/data/landing/events'
import { PATHS, SECTION_IDS } from '~/data/navigation'
import type { EventSummary } from '~/types/events'

export function EventsSection({ events }: { events: EventSummary[] }) {
    return (
        <Section
            id={SECTION_IDS.events}
            surface='muted'>
            <div className='flex flex-col justify-between gap-4 md:flex-row md:items-end'>
                <SectionHeading
                    sectionId={SECTION_IDS.events}
                    reveal={false}
                    eyebrow={HOME_EVENTS_HEADING.eyebrow}
                    title={HOME_EVENTS_HEADING.title}
                />
                {events.length > 0 && (
                    <AnchorLink
                        to={PATHS.events}
                        layout='arrow'
                        trailingIcon={<ArrowRight aria-hidden />}
                        className='mb-8 md:mb-12'>
                        {HOME_EVENTS_HEADING.all}
                    </AnchorLink>
                )}
            </div>
            {events.length > 0 ? (
                <EventPanels events={events} />
            ) : (
                <EmptyState
                    {...HOME_EVENTS_EMPTY}
                    action={
                        <Button
                            asChild
                            variant='secondary'>
                            <Link to={PATHS.about}>{HOME_EVENTS_EMPTY.action}</Link>
                        </Button>
                    }
                />
            )}
        </Section>
    )
}
