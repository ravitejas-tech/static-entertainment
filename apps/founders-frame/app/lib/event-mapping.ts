import { CATEGORY_PHOTOS, DEFAULT_EVENT_PHOTO } from '~/data/events/covers'
import { MEMBER_TYPES } from '~/data/members/options'
import { directionsUrl, hasPassed, isOpen, lowestPrice, seatStatus } from '~/lib/events'
import { photoSrcSet } from '~/lib/media'
import { isOneOf } from '~/lib/options'
import { eventFaqsSchema, eventHostsSchema, eventScheduleSchema } from '~/schemas/event-content'
import { eventQuestionsSchema } from '~/schemas/event-questions'
import type {
    CategoryLabels,
    EventCover,
    EventDetail,
    EventSummary,
    EventWithTickets,
    RegistrationOption,
    TicketAvailability,
} from '~/types/events'

function registrationOptions(
    row: EventWithTickets,
    availability: TicketAvailability,
    now: number,
): RegistrationOption[] {
    return row.ticket_types
        .filter(({ visible }) => visible)
        .map((type) => {
            const remaining = availability.get(type.id)
            const status = seatStatus(type, remaining, row.sales_paused, now)
            return {
                id: type.id,
                name: type.name,
                description: type.description,
                price: type.price,
                admits: type.admits,
                minPerOrder: type.min_per_order,
                max: isOpen(status) ? Math.min(type.max_per_order, remaining ?? type.max_per_order) : 0,
                status,
                opensAt: type.sales_start,
            }
        })
}

function fallbackPhoto(category: string): EventCover {
    const photo = CATEGORY_PHOTOS[category] ?? DEFAULT_EVENT_PHOTO
    return { src: photo.src, alt: photo.alt, srcSet: photoSrcSet(photo) }
}

function summarize(row: EventWithTickets, options: RegistrationOption[], categories: CategoryLabels, now: number) {
    const ended = hasPassed(row.ends_at, now)
    const open = options.filter(({ status }) => isOpen(status))
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        categoryLabel: categories.get(row.category) ?? row.category,
        fromPrice: lowestPrice(open.length > 0 ? open : options),
        summary: row.summary,
        startsAt: row.starts_at,
        endsAt: row.ends_at,
        city: row.city,
        venueName: row.venue_name,
        cover: row.cover_url ? { src: row.cover_url, alt: row.cover_alt || row.title } : null,
        photo: row.cover_url ? { src: row.cover_url, alt: row.cover_alt || row.title } : fallbackPhoto(row.category),
        ended,
        open: !ended && open.length > 0,
        updatedAt: row.updated_at,
    } satisfies EventSummary
}

export function toEventSummary(
    row: EventWithTickets,
    categories: CategoryLabels,
    availability: TicketAvailability,
    now: number,
): EventSummary {
    return summarize(row, registrationOptions(row, availability, now), categories, now)
}

export function toEventDetail(
    row: EventWithTickets,
    categories: CategoryLabels,
    availability: TicketAvailability,
    now: number,
): EventDetail {
    const options = registrationOptions(row, availability, now)
    return {
        ...summarize(row, options, categories, now),
        description: row.description,
        venueAddress: row.venue_address,
        directionsUrl: directionsUrl(row),
        language: row.language,
        highlights: row.highlights,
        thingsToKnow: row.things_to_know,
        schedule: eventScheduleSchema.parse(row.schedule),
        hosts: eventHostsSchema.parse(row.hosts),
        faqs: eventFaqsSchema.parse(row.faqs),
        audience: row.audience.filter((value) => isOneOf(MEMBER_TYPES, value)),
        industries: row.industries,
        stages: row.founder_stages,
        options,
        questions: eventQuestionsSchema.parse(row.questions),
        terms: row.terms,
        refundPolicy: row.refund_policy,
    }
}
