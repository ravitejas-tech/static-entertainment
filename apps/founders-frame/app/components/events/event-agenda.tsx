import { AgendaMonth } from '~/components/events/agenda-month'
import { groupByMonth } from '~/lib/agenda'
import type { EventSummary } from '~/types/events'

export interface EventAgendaProps {
    upcoming: EventSummary[]
    past: EventSummary[]
}

export function EventAgenda({ upcoming, past }: EventAgendaProps) {
    return (
        <div>
            {groupByMonth(upcoming).map((month) => (
                <AgendaMonth
                    key={month.key}
                    month={month}
                />
            ))}
            {groupByMonth(past).map((month) => (
                <AgendaMonth
                    key={`past-${month.key}`}
                    month={month}
                    past
                />
            ))}
        </div>
    )
}
