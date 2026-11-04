import type { BadgeTone } from '~/components/ui/badge'
import type { ApplicationStatus } from '~/types/application'

interface StatusCopy {
    label: string
    tone: BadgeTone
    title: string
    body: string
}

export const APPLICATION_STATUS: Record<ApplicationStatus, StatusCopy> = {
    pending: {
        label: 'Under review',
        tone: 'neutral',
        title: 'Your application is in.',
        body: 'Our team is reviewing your application. We’ll email you as soon as there’s an update.',
    },
    approved: {
        label: 'Approved',
        tone: 'green',
        title: 'You’re approved. Welcome in.',
        body: 'Please confirm your attendance so we can issue your entry QR code. We look forward to meeting you.',
    },
    waitlisted: {
        label: 'Waitlisted',
        tone: 'sand',
        title: 'You’re on the waitlist.',
        body: 'The room is full for now. We’ll email you if a place opens up.',
    },
    rejected: {
        label: 'Not selected',
        tone: 'neutral',
        title: 'Thank you for applying.',
        body: 'We weren’t able to offer you a place at this gathering. The room’s capacity and mix are limited, and this isn’t a reflection of your potential. We’d love to see you at a future event.',
    },
    confirmed: {
        label: 'Confirmed',
        tone: 'navy',
        title: 'You’re confirmed.',
        body: 'Your place is reserved and your entry QR code is ready.',
    },
    withdrawn: {
        label: 'Withdrawn',
        tone: 'outline',
        title: 'This application was withdrawn.',
        body: 'If this doesn’t look right, apply again from the event page.',
    },
}
