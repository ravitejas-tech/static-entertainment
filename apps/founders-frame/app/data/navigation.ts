export const PATHS = {
    home: '/',
    events: '/events',
    about: '/about',
    tickets: '/tickets',
    applications: '/applications',
} as const

export const PUBLIC_PAGES = [PATHS.home, PATHS.events, PATHS.about] as const

export type PublicPage = (typeof PUBLIC_PAGES)[number]

export const SEAT_PARAM = 'seat'

const withSeat = (path: string, ticketTypeId?: string) =>
    ticketTypeId ? `${path}?${new URLSearchParams({ [SEAT_PARAM]: ticketTypeId })}` : path

export const eventPath = (slug: string) => `${PATHS.events}/${slug}`

export const rsvpPath = (slug: string, ticketTypeId?: string) => withSeat(`${eventPath(slug)}/rsvp`, ticketTypeId)

export const applyPath = (slug: string, ticketTypeId?: string) => withSeat(`${eventPath(slug)}/apply`, ticketTypeId)

export const ticketPath = (accessToken: string) => `${PATHS.tickets}/${accessToken}`

export const applicationPath = (accessToken: string) => `${PATHS.applications}/${accessToken}`

export const SECTION_IDS = {
    events: 'events',
    audience: 'who-its-for',
    formats: 'how-it-works',
    join: 'join',
    questions: 'questions',
} as const

export const sectionHref = (id: (typeof SECTION_IDS)[keyof typeof SECTION_IDS]) => `${PATHS.home}#${id}`

export const NAV_LINKS = [
    { label: 'Events', to: PATHS.events },
    { label: 'Who it’s for', to: sectionHref(SECTION_IDS.audience) },
    { label: 'How it works', to: sectionHref(SECTION_IDS.formats) },
    { label: 'About', to: PATHS.about },
] as const

export const PRIMARY_CTA_LABEL = 'Explore events'
