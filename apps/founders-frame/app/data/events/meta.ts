import { PATHS } from '~/data/navigation'

export const EVENTS_PAGE = {
    title: 'Events · Founders Frame',
    description:
        'Founder mixers, roundtables, workshops and networking evenings in Pune. Book your ticket online and get your QR code straight away.',
    path: PATHS.events,
} as const

export const EVENTS_HEADING = {
    eyebrow: 'Events',
    title: 'Gatherings worth your evening.',
    lead: 'Founder mixers, small roundtables and focused workshops for the people building in Pune. Book online and your QR ticket arrives straight away.',
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
    label: 'Filter by event type',
    all: 'All',
} as const

export const EVENTS_AGENDA = {
    gatherings: (count: number) => (count === 1 ? '1 gathering' : `${count} gatherings`),
    past: 'Past',
    details: 'View details',
    ended: (day: string) => `Ended · ${day}`,
} as const

export const eventMetaTitle = (title: string) => `${title} · Founders Frame`
