import { formatCalendarMonth } from '~/lib/format'
import type { EventMonth, EventSummary, TypeCount } from '~/types/events'

export function groupByMonth(events: EventSummary[]): EventMonth[] {
    const months = new Map<string, EventMonth>()
    for (const event of events) {
        const { key, month, year } = formatCalendarMonth(event.startsAt)
        const group = months.get(key) ?? { key, month, year, events: [] }
        group.events.push(event)
        months.set(key, group)
    }
    return [...months.values()]
}

export function countTypes(events: EventSummary[]): TypeCount[] {
    return [...new Set(events.map(({ categoryLabel }) => categoryLabel))].map((label) => ({
        label,
        count: events.filter(({ categoryLabel }) => categoryLabel === label).length,
    }))
}
