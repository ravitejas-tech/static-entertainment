import { CreditCard, Landmark, Smartphone } from 'lucide-react'
import { CHECKOUT_COPY } from '~/data/registration/form'
import { TICKET_PAGE } from '~/data/tickets/page'
import { formatRupees } from '~/lib/format'
import type { JourneyLine, JourneyPayMethod, JourneyStep } from '~/types/landing'

export const FORMATS_HEADING = {
    eyebrow: 'How events work',
    title: 'Book once. Walk in with your QR code.',
    lead: 'Every Founders Frame gathering works the same way. Pick your ticket, pay online, and your QR code gets you in.',
} as const

export const FORMATS_CTA = 'See upcoming events'

export const JOURNEY_STEPS: JourneyStep[] = [
    {
        short: 'Pick',
        title: 'Pick your ticket',
        body: 'Choose an event and the ticket that fits. Booking for colleagues? Add them to the same order.',
    },
    {
        short: 'Pay',
        title: 'Pay online',
        body: 'Pay by UPI, card or netbanking. Your seats are held for 15 minutes while you pay.',
    },
    {
        short: 'Ticket',
        title: 'Get your QR ticket',
        body: 'It reaches your inbox straight away and stays on your ticket page.',
    },
    {
        short: 'Check in',
        title: 'Check in at the door',
        body: 'Show your QR code as you arrive. Each code lets one person in.',
    },
]

const DEMO_EVENT = 'Founder Mixer'

const DEMO_FIRST_LINE: JourneyLine = { name: 'Early bird', price: 499, quantity: 2 }

const DEMO_LINES: JourneyLine[] = [DEMO_FIRST_LINE, { name: 'Standard', price: 799, quantity: 1 }]

const DEMO_TICKETS = DEMO_LINES.reduce((sum, line) => sum + line.quantity, 0)

const DEMO_TOTAL = formatRupees(DEMO_LINES.reduce((sum, line) => sum + line.price * line.quantity, 0))

const FIRST_TICKET = `${DEMO_FIRST_LINE.name} · ${TICKET_PAGE.ticketOf(1, DEMO_TICKETS)}`

const PAY_METHODS: JourneyPayMethod[] = [
    { label: 'UPI', icon: Smartphone },
    { label: 'Card', icon: CreditCard },
    { label: 'Netbanking', icon: Landmark },
]

export const JOURNEY_PHONE = {
    pay: CHECKOUT_COPY.pay(DEMO_TOTAL),
    tickets: {
        event: DEMO_EVENT,
        when: 'Saturday · 6:30 PM · Baner',
        label: 'Tickets',
        lines: DEMO_LINES,
    },
    payment: {
        label: 'Total',
        total: DEMO_TOTAL,
        summary: `${DEMO_EVENT} · ${DEMO_TICKETS} tickets`,
        hold: 'Seats held for 14:52',
        methodsLabel: 'Pay with',
        methods: PAY_METHODS,
        secure: 'Secure payment',
    },
    ticket: {
        title: TICKET_PAGE.title,
        event: `${DEMO_EVENT} · Saturday`,
        line: FIRST_TICKET,
        code: 'FF-PUN-261121-A82F4-1',
        sent: 'Also sent to your email',
        count: DEMO_TICKETS,
    },
    checkIn: {
        title: TICKET_PAGE.checkedIn,
        line: `6:42 PM · ${TICKET_PAGE.ticketOf(1, DEMO_TICKETS)}`,
        welcome: 'Enjoy the evening.',
    },
} as const

export const JOURNEY_QR = {
    viewBox: '0 0 21 21',
    path: 'M0 0h7v1h-7zM8 0h1v1h-1zM14 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM14 1h1v1h-1zM20 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM9 2h1v1h-1zM12 2h1v1h-1zM14 2h1v1h-1zM16 2h3v1h-3zM20 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM8 3h1v1h-1zM11 3h2v1h-2zM14 3h1v1h-1zM16 3h3v1h-3zM20 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM9 4h1v1h-1zM14 4h1v1h-1zM16 4h3v1h-3zM20 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM10 5h1v1h-1zM14 5h1v1h-1zM20 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h7v1h-7zM8 7h1v1h-1zM0 8h1v1h-1zM2 8h2v1h-2zM5 8h3v1h-3zM10 8h1v1h-1zM14 8h1v1h-1zM17 8h1v1h-1zM19 8h2v1h-2zM1 9h1v1h-1zM3 9h1v1h-1zM7 9h1v1h-1zM9 9h2v1h-2zM12 9h1v1h-1zM14 9h1v1h-1zM19 9h2v1h-2zM1 10h2v1h-2zM5 10h2v1h-2zM10 10h1v1h-1zM12 10h3v1h-3zM16 10h3v1h-3zM0 11h1v1h-1zM2 11h1v1h-1zM4 11h1v1h-1zM10 11h1v1h-1zM12 11h2v1h-2zM15 11h1v1h-1zM18 11h1v1h-1zM20 11h1v1h-1zM0 12h1v1h-1zM3 12h1v1h-1zM6 12h1v1h-1zM8 12h2v1h-2zM11 12h1v1h-1zM14 12h2v1h-2zM17 12h1v1h-1zM20 12h1v1h-1zM8 13h3v1h-3zM13 13h1v1h-1zM16 13h3v1h-3zM0 14h7v1h-7zM8 14h1v1h-1zM14 14h3v1h-3zM18 14h2v1h-2zM0 15h1v1h-1zM6 15h1v1h-1zM8 15h2v1h-2zM11 15h2v1h-2zM14 15h3v1h-3zM19 15h2v1h-2zM0 16h1v1h-1zM2 16h3v1h-3zM6 16h1v1h-1zM9 16h3v1h-3zM13 16h1v1h-1zM15 16h2v1h-2zM19 16h2v1h-2zM0 17h1v1h-1zM2 17h3v1h-3zM6 17h1v1h-1zM8 17h1v1h-1zM10 17h1v1h-1zM13 17h1v1h-1zM15 17h3v1h-3zM19 17h1v1h-1zM0 18h1v1h-1zM2 18h3v1h-3zM6 18h1v1h-1zM8 18h4v1h-4zM16 18h3v1h-3zM0 19h1v1h-1zM6 19h1v1h-1zM11 19h2v1h-2zM14 19h1v1h-1zM16 19h1v1h-1zM18 19h1v1h-1zM0 20h7v1h-7zM8 20h2v1h-2zM11 20h3v1h-3zM15 20h2v1h-2zM18 20h2v1h-2z',
} as const
