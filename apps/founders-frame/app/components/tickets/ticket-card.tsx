import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { QrCode } from '~/components/ui/qr-code'
import { Text } from '~/components/ui/text'
import { TICKET_PAGE } from '~/data/tickets/page'
import { ticketQrValue } from '~/data/tickets/ticket'
import type { BookingTicket } from '~/types/booking'

export interface TicketCardProps {
    ticket: BookingTicket
    index: number
    total: number
}

export function TicketCard({ ticket, index, total }: TicketCardProps) {
    const { code, qr_token, status, checked_in_at, ticket_type } = ticket

    return (
        <Card
            padding='none'
            elevated
            className='overflow-hidden'>
            <div className='bg-ink px-5 py-3'>
                <Text
                    variant='meta'
                    tone='inverse'>
                    {TICKET_PAGE.admitOne}
                </Text>
            </div>
            <div className='grid gap-6 p-5 sm:grid-cols-5 sm:items-center sm:p-6'>
                <QrCode
                    value={ticketQrValue(qr_token)}
                    label={TICKET_PAGE.qrLabel(code)}
                    className='mx-auto w-full max-w-56 sm:col-span-2'
                />
                <div className='space-y-2 sm:col-span-3'>
                    <Text variant='title'>{ticket_type}</Text>
                    <Text
                        variant='small'
                        tone='secondary'>
                        {TICKET_PAGE.ticketOf(index, total)}
                    </Text>
                    <Text variant='code'>{code}</Text>
                    {status === 'cancelled' ? (
                        <Badge tone='red'>{TICKET_PAGE.cancelled}</Badge>
                    ) : (
                        checked_in_at && <Badge tone='green'>{TICKET_PAGE.checkedIn}</Badge>
                    )}
                    <Text
                        variant='small'
                        tone='muted'>
                        {TICKET_PAGE.oneEntry}
                    </Text>
                </div>
            </div>
        </Card>
    )
}
