import type { BadgeTone } from '~/components/ui/badge'

interface FormatConfig {
    label: string
    cta: string
    tone: BadgeTone
    note: string
}

export const EVENT_FORMATS = {
    free_rsvp: {
        label: 'Free RSVP',
        cta: 'RSVP for free',
        tone: 'gold',
        note: 'Free to attend. Reserve your spot and your entry QR code arrives by email.',
    },
    application_based: {
        label: 'Application-based',
        cta: 'Apply to attend',
        tone: 'navy',
        note: 'A curated room. Apply, and we’ll email you once our team has reviewed your application.',
    },
    paid: {
        label: 'Paid event',
        cta: 'Get tickets',
        tone: 'sand',
        note: 'Paid registration isn’t open on this site yet. Write to us and we’ll help you register.',
    },
} as const satisfies Record<string, FormatConfig>
