export const PREVIEW_PARAM = 'preview'

export const RELATED_EVENTS_LIMIT = 3

export const EVENT_PAGE_COPY = {
    back: 'All events',
    preview: { title: 'Preview', body: 'This event isn’t published yet. Only people with this link can see it.' },
    ended: { title: 'This event has ended', body: 'Explore what’s coming up next.' },
    blocks: {
        about: 'About this event',
        audience: 'Who it’s for',
        industries: 'Industries',
        stages: 'Founder stages',
        speakers: 'Speakers and moderators',
        agenda: 'Agenda',
        highlights: 'What to expect',
        goodToKnow: 'Good to know',
        faqs: 'Questions',
        policies: 'Terms and cancellation',
        related: 'More events',
    },
    facts: {
        language: 'Language',
    },
    registration: {
        title: 'Register',
        free: 'Free',
        noOptions: 'Registration isn’t open for this event.',
        reviewNote: 'Every application is reviewed by our team.',
        opens: (day: string) => `Opens ${day}`,
    },
    hostParts: { host: 'Host', speaker: 'Speaker', moderator: 'Moderator' },
} as const

export const REGISTER_ANCHOR = 'register'
