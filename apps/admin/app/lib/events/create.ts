import { CATEGORY_TONES, DEFAULT_POLICIES, DEFAULT_REGION, DEFAULT_TONE } from '~/data/events/defaults'
import { NEW_EVENT_TIMES, SATURDAY } from '~/data/events/limits'
import { findCity } from '~/lib/city'
import { addDays, fromIstInput, nextWeekday } from '~/lib/date-input'
import { slugify } from '~/lib/slug'
import type { NewEventValues } from '~/schemas/event-create'
import type { EventInsert } from '~/types/events'

export function newEventDefaults(category: string): NewEventValues {
    return {
        title: '',
        category,
        date: nextWeekday(SATURDAY),
        start_time: NEW_EVENT_TIMES.start,
        end_time: NEW_EVENT_TIMES.end,
        city: '',
        city_code: '',
        venue_name: '',
        venue_address: '',
        venue_lat: null,
        venue_lng: null,
        summary: '',
        cover: undefined,
        cover_alt: '',
    }
}

export function buildEventInsert({
    date,
    start_time,
    end_time,
    cover: _cover,
    ...values
}: NewEventValues): Omit<EventInsert, 'community'> {
    const endDate = end_time > start_time ? date : addDays(date, 1)
    return {
        ...values,
        slug: slugify(values.title, values.city),
        tone: CATEGORY_TONES[values.category] ?? DEFAULT_TONE,
        region: findCity(values.city)?.region ?? DEFAULT_REGION,
        starts_at: fromIstInput(`${date}T${start_time}`),
        ends_at: fromIstInput(`${endDate}T${end_time}`),
        ...DEFAULT_POLICIES,
    }
}
