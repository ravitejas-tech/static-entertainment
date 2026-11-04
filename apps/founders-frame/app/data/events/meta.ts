import { PATHS } from '~/data/navigation'

export const EVENTS_PAGE = {
    title: 'Events · Founders Frame',
    description:
        'Curated founder mixers, roundtables and networking evenings in Pune. RSVP for free or apply to attend.',
    path: PATHS.events,
} as const

export const EVENTS_HEADING = {
    eyebrow: 'Events',
    title: 'Gatherings worth your evening.',
    lead: 'Free community events, curated roundtables and focused workshops for the people building in Pune.',
} as const

export const EVENTS_SECTIONS = {
    upcoming: 'Coming up',
    past: 'Past events',
    empty: {
        title: 'Nothing scheduled right now',
        body: 'New gatherings are announced here first. Check back soon.',
    },
} as const

export const EVENTS_FILTERS = {
    label: 'Filter by format',
    all: 'All',
    type: 'Event type',
    allTypes: 'All event types',
    none: {
        title: 'No events match these filters',
        body: 'Try another format or event type.',
        action: 'Clear filters',
    },
} as const

export const EVENTS_AGENDA = {
    gatherings: (count: number) => (count === 1 ? '1 gathering' : `${count} gatherings`),
    past: 'Past',
    details: 'View details',
    ended: (day: string) => `Ended · ${day}`,
} as const

export const REGISTRATION_GUIDE = {
    title: 'How registration works',
    formats: ['free_rsvp', 'application_based'],
} as const

export const eventMetaTitle = (title: string) => `${title} · Founders Frame`
