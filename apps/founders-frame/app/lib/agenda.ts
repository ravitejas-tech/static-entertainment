import { EVENT_FORMATS } from '~/data/events/formats'
import { formatCalendarMonth } from '~/lib/format'
import type { EventFormat, EventMonth, EventSummary, FormatCount } from '~/types/events'
import type { Option } from '~/types/options'

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

export function countFormats(events: EventSummary[]): FormatCount[] {
    return (Object.keys(EVENT_FORMATS) as EventFormat[])
        .map((format) => ({ format, count: events.filter((event) => event.format === format).length }))
        .filter(({ count }) => count > 0)
}

export function typeOptions(events: EventSummary[]): Option[] {
    return [...new Set(events.map(({ categoryLabel }) => categoryLabel))].map((label) => ({ value: label, label }))
}
