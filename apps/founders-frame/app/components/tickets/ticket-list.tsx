import { TicketCard } from '~/components/tickets/ticket-card'
import type { BookingTicket } from '~/types/booking'

export function TicketList({ tickets }: { tickets: BookingTicket[] }) {
    return (
        <ul className='space-y-4'>
            {tickets.map((ticket, index) => (
                <li key={ticket.code}>
                    <TicketCard
                        ticket={ticket}
                        index={index + 1}
                        total={tickets.length}
                    />
                </li>
            ))}
        </ul>
    )
}
