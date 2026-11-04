import type { z } from 'zod'
import type { SEAT_STATUS_LABELS } from '~/data/events/status'
import type { eventFaqSchema, eventHostSchema, eventScheduleItemSchema } from '~/schemas/event-content'
import type { eventQuestionSchema } from '~/schemas/event-questions'
import type { Tables } from '~/types/database'
import type { MemberType } from '~/types/members'

export type EventRow = Tables<'events'>

export type TicketTypeRow = Tables<'ticket_types'>

export type EventWithTickets = EventRow & { ticket_types: TicketTypeRow[] }

export type CategoryLabels = Map<string, string>

export type TicketAvailability = Map<string, number>

export type SeatStatus = keyof typeof SEAT_STATUS_LABELS

export type EventHost = z.infer<typeof eventHostSchema>

export type EventScheduleItem = z.infer<typeof eventScheduleItemSchema>

export type EventFaq = z.infer<typeof eventFaqSchema>

export type EventQuestion = z.infer<typeof eventQuestionSchema>

export type EventLocation = Pick<
    EventRow,
    'venue_lat' | 'venue_lng' | 'map_url' | 'venue_name' | 'venue_address' | 'city'
>

export interface EventCover {
    src: string
    alt: string
    srcSet?: string
}

export interface RegistrationOption {
    id: string
    name: string
    description: string
    price: number
    admits: number
    minPerOrder: number
    max: number
    status: SeatStatus
    opensAt: string | null
}

export interface EventSummary {
    id: string
    slug: string
    title: string
    categoryLabel: string
    fromPrice: number | null
    summary: string
    startsAt: string
    endsAt: string
    city: string
    venueName: string
    cover: EventCover | null
    photo: EventCover
    ended: boolean
    open: boolean
    updatedAt: string
}

export interface EventMonth {
    key: string
    month: string
    year: string
    events: EventSummary[]
}

export interface TypeCount {
    label: string
    count: number
}

export interface EventDetail extends EventSummary {
    description: string
    venueAddress: string
    directionsUrl: string
    language: string
    highlights: string[]
    thingsToKnow: string[]
    schedule: EventScheduleItem[]
    hosts: EventHost[]
    faqs: EventFaq[]
    audience: MemberType[]
    industries: string[]
    stages: string[]
    options: RegistrationOption[]
    questions: EventQuestion[]
    terms: string
    refundPolicy: string
}

export interface EventPageData {
    event: EventDetail
    related: EventSummary[]
    preview: boolean
}
