export const REGISTRATION_PAGE = {
    back: 'Back to event',
    title: 'Book your place',
    metaTitle: (event: string) => `Book tickets · ${event}`,
    metaDescription: 'Book tickets for a Founders Frame event.',
    blocked: {
        missing: { title: 'We couldn’t find this event', body: 'It may have been moved or unpublished.' },
        ended: { title: 'This event has ended', body: 'Explore what’s coming up next.' },
        closed: {
            title: 'Tickets aren’t on sale',
            body: 'There are no tickets available right now. Check the event page for updates.',
        },
    },
    more: 'Explore other events',
} as const

export const FIELD_IDS = {
    tickets: 'registration-tickets',
    name: 'registration-name',
    email: 'registration-email',
    phone: 'registration-phone',
    memberType: 'registration-member-type',
    jobTitle: 'registration-job-title',
    companyName: 'registration-company',
    promo: 'registration-promo',
} as const

export const TEST_PAYMENT_TITLE_ID = 'registration-test-payment-title'

export const questionFieldId = (questionId: string) => `registration-question-${questionId}`
