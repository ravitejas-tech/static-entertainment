import { EventAgenda } from '~/components/events/event-agenda'
import { EventFilters } from '~/components/events/event-filters'
import { PastEventCard } from '~/components/events/past-event-card'
import { RegistrationGuide } from '~/components/events/registration-guide'
import { EventPanels } from '~/components/landing/event-panels'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { EVENTS_FILTERS, EVENTS_SECTIONS } from '~/data/events/meta'
import { useEventFilters } from '~/hooks/use-event-filters'
import type { EventSummary } from '~/types/events'

export function EventBrowser({ events }: { events: EventSummary[] }) {
    const upcoming = events.filter(({ ended }) => !ended)
    const past = events.filter(({ ended }) => ended).reverse()
    const { format, type, formats, types, visible, setFormat, setType, clear } = useEventFilters(upcoming)

    return (
        <>
            {upcoming.length > 0 ? (
                <Reveal
                    trigger='load'
                    order={5}>
                    <EventFilters
                        total={upcoming.length}
                        format={format}
                        formats={formats}
                        type={type}
                        types={types}
                        onFormat={setFormat}
                        onType={setType}
                    />
                </Reveal>
            ) : (
                <EmptyState
                    level='h2'
                    {...EVENTS_SECTIONS.empty}
                    className='mb-10'
                />
            )}
            {upcoming.length > 0 && visible.length === 0 && (
                <EmptyState
                    level='h2'
                    {...EVENTS_FILTERS.none}
                    className='mb-10'
                    action={
                        <Button
                            variant='secondary'
                            onClick={clear}>
                            {EVENTS_FILTERS.none.action}
                        </Button>
                    }
                />
            )}
            <div className='space-y-10 md:hidden'>
                {visible.length > 0 && (
                    <section>
                        <Text
                            as='h2'
                            className='sr-only'>
                            {EVENTS_SECTIONS.upcoming}
                        </Text>
                        <EventPanels
                            key={`${format ?? 'all'}-${type}`}
                            events={visible}
                            prioritizeFirst
                        />
                    </section>
                )}
                {past.length > 0 && (
                    <Reveal
                        effect='lift'
                        className='space-y-3'>
                        <Text
                            as='h2'
                            variant='title'>
                            {EVENTS_SECTIONS.past}
                        </Text>
                        {past.map((event) => (
                            <PastEventCard
                                key={event.id}
                                event={event}
                            />
                        ))}
                    </Reveal>
                )}
                <Reveal effect='lift'>
                    <RegistrationGuide />
                </Reveal>
            </div>
            <div className='hidden md:block'>
                <EventAgenda
                    upcoming={visible}
                    past={past}
                />
            </div>
        </>
    )
}
