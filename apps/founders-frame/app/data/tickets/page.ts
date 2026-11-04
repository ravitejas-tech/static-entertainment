export const TICKET_PAGE = {
    meta: {
        title: 'Your ticket · Founders Frame',
        description: 'Your Founders Frame entry QR code.',
    },
    eyebrow: 'Your ticket',
    title: 'You’re confirmed.',
    lead: 'Show this QR code at the entrance. It’s also in your email.',
    bookingCode: 'Booking ID',
    attendee: 'Name',
    admitOne: 'Founders Frame · Admit one',
    ticketOf: (index: number, total: number) => `Ticket ${index} of ${total}`,
    qrLabel: (code: string) => `Entry QR code for ticket ${code}`,
    checkedIn: 'Checked in',
    cancelled: 'Cancelled',
    oneEntry: 'Each code lets one person in once.',
    goodToKnow: 'Good to know',
    explore: 'Explore more events',
    notFound: { title: 'We couldn’t find this ticket', body: 'Check the link in your email.' },
    loadFailed: { title: 'We couldn’t load your ticket', body: 'Check your connection and try again.' },
    pending: {
        title: 'We’re confirming your place',
        body: 'This usually takes a moment. Refresh this page shortly, or check your email.',
    },
    closed: {
        title: 'This registration is no longer active',
        body: 'It was cancelled or refunded. If this doesn’t look right, reply to your confirmation email.',
    },
} as const
