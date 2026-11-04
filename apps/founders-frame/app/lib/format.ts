import { EVENT_LOCALE, EVENT_TIME_ZONE } from '~/data/ui/format'

const rupees = new Intl.NumberFormat(EVENT_LOCALE, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

const list = new Intl.ListFormat(EVENT_LOCALE, { type: 'conjunction' })

const eventDay = new Intl.DateTimeFormat(EVENT_LOCALE, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: EVENT_TIME_ZONE,
})

const eventTime = new Intl.DateTimeFormat(EVENT_LOCALE, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: EVENT_TIME_ZONE,
})

const fullDate = new Intl.DateTimeFormat(EVENT_LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: EVENT_TIME_ZONE,
})

const dateBadge = {
    weekday: new Intl.DateTimeFormat(EVENT_LOCALE, { weekday: 'short', timeZone: EVENT_TIME_ZONE }),
    month: new Intl.DateTimeFormat(EVENT_LOCALE, { month: 'short', timeZone: EVENT_TIME_ZONE }),
    day: new Intl.DateTimeFormat(EVENT_LOCALE, { day: 'numeric', timeZone: EVENT_TIME_ZONE }),
}

const calendarMonth = {
    key: new Intl.DateTimeFormat(EVENT_LOCALE, { year: 'numeric', month: '2-digit', timeZone: EVENT_TIME_ZONE }),
    year: new Intl.DateTimeFormat(EVENT_LOCALE, { year: 'numeric', timeZone: EVENT_TIME_ZONE }),
}

export function formatRupees(amount: number) {
    return rupees.format(amount)
}

export function formatList(items: readonly string[]) {
    return list.format(items)
}

export function formatSentenceList(items: readonly string[]) {
    return formatList(items.map((item, index) => (index === 0 ? item : item.toLowerCase())))
}

export function formatEventDay(instant: string) {
    return eventDay.format(new Date(instant))
}

export function formatEventTime(instant: string) {
    return eventTime.format(new Date(instant))
}

export function formatFullDate(instant: string) {
    return fullDate.format(new Date(instant))
}

export function formatTimeRange(startsAt: string, endsAt: string) {
    return `${formatEventTime(startsAt)} – ${formatEventTime(endsAt)}`
}

export function formatDateBadge(instant: string) {
    const date = new Date(instant)
    return {
        weekday: dateBadge.weekday.format(date),
        month: dateBadge.month.format(date),
        day: dateBadge.day.format(date),
    }
}

export function formatCalendarMonth(instant: string) {
    const date = new Date(instant)
    return {
        key: calendarMonth.key.format(date),
        month: dateBadge.month.format(date),
        year: calendarMonth.year.format(date),
    }
}

export function formatStepNumber(step: number) {
    return String(step).padStart(2, '0')
}
