import { AgendaRow } from '~/components/events/agenda-row'
import { Reveal } from '~/components/ui/reveal'
import { RiseWords } from '~/components/ui/rise-words'
import { Text } from '~/components/ui/text'
import { EVENTS_AGENDA } from '~/data/events/meta'
import type { EventMonth } from '~/types/events'

export interface AgendaMonthProps {
    month: EventMonth
    past?: boolean
}

export function AgendaMonth({ month, past = false }: AgendaMonthProps) {
    return (
        <div className='grid gap-5 border-t border-border py-8 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-10 lg:py-10'>
            <div className='flex items-baseline gap-4 lg:sticky lg:top-24 lg:col-span-3 lg:block lg:self-start'>
                <Text
                    as='h2'
                    variant='hero'
                    tone={past ? 'faint' : 'primary'}>
                    <RiseWords text={month.month} />
                </Text>
                <Text
                    variant='label'
                    tone={past ? 'muted' : 'secondary'}
                    className='lg:mt-3'>
                    {month.year} · {past ? EVENTS_AGENDA.past : EVENTS_AGENDA.gatherings(month.events.length)}
                </Text>
            </div>
            <div className='space-y-4 lg:col-span-9'>
                {month.events.map((event, index) => (
                    <Reveal
                        key={event.id}
                        effect='lift'
                        order={index}>
                        <AgendaRow
                            event={event}
                            past={past}
                        />
                    </Reveal>
                ))}
            </div>
        </div>
    )
}
