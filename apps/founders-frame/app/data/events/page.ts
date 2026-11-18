export const PREVIEW_PARAM = 'preview'

export const RELATED_EVENTS_LIMIT = 3

export const EVENT_PAGE_COPY = {
    back: 'All events',
    preview: { title: 'Preview', body: 'This event isn’t published yet. Only people with this link can see it.' },
    ended: { title: 'This event has ended', body: 'Explore what’s coming up next.' },
    blocks: {
        about: 'About this event',
        highlights: 'What to expect',
        agenda: 'The evening',
        audience: 'Who’s in the room',
        industries: 'Industries',
        stages: 'Founder stages',
        speakers: 'Hosts and speakers',
        goodToKnow: 'Good to know',
        faqs: 'Questions',
        terms: 'Terms',
        refunds: 'Refunds',
        related: 'More events',
    },
    when: (day: string, time: string) => `${day} · ${time}`,
    registration: {
        title: 'Tickets',
        from: 'From',
        note: 'Pay online. Your QR ticket arrives by email straight away.',
        noOptions: 'Tickets aren’t on sale for this event yet.',
        opens: (day: string) => `On sale ${day}`,
    },
    hostParts: { host: 'Host', speaker: 'Speaker', moderator: 'Moderator' },
} as const

export const REGISTER_ANCHOR = 'register'
