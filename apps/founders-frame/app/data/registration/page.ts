export const REGISTRATION_PAGE = {
    back: 'Back to event',
    summaryTitle: 'You’re registering for',
    modes: {
        rsvp: {
            eyebrow: 'Free RSVP',
            title: 'Reserve your spot',
            lead: 'It takes a minute. Your entry QR code arrives by email as soon as you’re done.',
            submit: 'Reserve your spot',
            submitting: 'Reserving…',
            metaTitle: (event: string) => `RSVP · ${event}`,
        },
        apply: {
            eyebrow: 'Application',
            title: 'Apply to attend',
            lead: 'Tell us a little about yourself and what you’re hoping to get from the room.',
            submit: 'Submit application',
            submitting: 'Submitting…',
            metaTitle: (event: string) => `Apply · ${event}`,
        },
    },
    review: {
        title: 'How applications work',
        steps: [
            'You apply with a few details about yourself and your work.',
            'Our team reviews every application to keep the room balanced and useful for everyone.',
            'If you’re approved, we email you a link to confirm your place.',
            'Once you confirm, your entry QR code arrives by email.',
        ],
        note: 'Applying doesn’t guarantee a place. Every decision is about the mix of the room, not your potential.',
    },
    blocked: {
        missing: { title: 'We couldn’t find this event', body: 'It may have been moved or unpublished.' },
        ended: { title: 'This event has ended', body: 'Explore what’s coming up next.' },
        closed: {
            title: 'Registration isn’t open',
            body: 'There are no places to register for right now. Check the event page for updates.',
        },
    },
    submitted: {
        title: 'Your application is in.',
        body: 'Thank you for your interest in Founders Frame. Our team will review your application and email you with an update.',
        note: 'We’ll be in touch soon.',
        view: 'View your application',
        more: 'Explore other events',
    },
    metaDescription: 'Register for a Founders Frame event.',
} as const

export const FIELD_IDS = {
    seat: 'registration-seat',
    name: 'registration-name',
    email: 'registration-email',
    phone: 'registration-phone',
    memberType: 'registration-member-type',
    jobTitle: 'registration-job-title',
    companyName: 'registration-company',
    companyWebsite: 'registration-website',
    industry: 'registration-industry',
    stage: 'registration-stage',
    linkedinUrl: 'registration-linkedin',
} as const

export const questionFieldId = (questionId: string) => `registration-question-${questionId}`
