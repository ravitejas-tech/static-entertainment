import { RELATED_EVENTS_LIMIT } from '~/data/events/page'
import { toEventDetail, toEventSummary } from '~/lib/event-mapping'
import { hasPassed } from '~/lib/events'
import { previewTokenSchema } from '~/schemas/event-content'
import {
    getEventPreview,
    getPublishedEvent,
    getTicketAvailability,
    listCategoryLabels,
    listPublishedEvents,
} from '~/services/events'
import type { EventPageData } from '~/types/events'

export async function loadEventSummaries(now = Date.now()) {
    const [rows, categories] = await Promise.all([listPublishedEvents(), listCategoryLabels()])
    const live = rows.filter((row) => !hasPassed(row.ends_at, now)).map(({ id }) => id)
    const availability = await getTicketAvailability(live)
    return rows.map((row) => toEventSummary(row, categories, availability, now))
}

export async function loadUpcomingEvents(now = Date.now()) {
    return (await loadEventSummaries(now)).filter(({ ended }) => !ended)
}

export async function loadEventPage(slug: string, previewToken: string | null, now = Date.now()) {
    if (previewToken !== null && !previewTokenSchema.safeParse(previewToken).success) return null
    const [row, categories] = await Promise.all([
        previewToken ? getEventPreview(slug, previewToken) : getPublishedEvent(slug),
        listCategoryLabels(),
    ])
    if (!row) return null

    const [availability, upcoming] = await Promise.all([
        hasPassed(row.ends_at, now) || previewToken ? new Map<string, number>() : getTicketAvailability([row.id]),
        loadUpcomingEvents(now),
    ])

    return {
        event: toEventDetail(row, categories, availability, now),
        related: upcoming.filter((event) => event.slug !== slug).slice(0, RELATED_EVENTS_LIMIT),
        preview: Boolean(previewToken),
    } satisfies EventPageData
}

export async function loadRegistration(slug: string, now = Date.now()) {
    const [row, categories] = await Promise.all([getPublishedEvent(slug), listCategoryLabels()])
    if (!row) return null
    return toEventDetail(row, categories, await getTicketAvailability([row.id]), now)
}
