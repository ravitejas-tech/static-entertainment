import { Link } from 'react-router'
import { TicketDetails } from '~/components/tickets/ticket-details'
import { TicketList } from '~/components/tickets/ticket-list'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Skeleton } from '~/components/ui/skeleton'
import { StateScreen } from '~/components/ui/state-screen'
import { Text } from '~/components/ui/text'
import { PATHS } from '~/data/navigation'
import { TICKET_PAGE } from '~/data/tickets/page'
import { useBooking } from '~/hooks/tickets/queries'
import { ticketScreenState } from '~/lib/tickets/state'

export function TicketScreen({ token }: { token: string }) {
    const { data: booking, isPending, isError } = useBooking({ variables: token })

    if (isPending) {
        return (
            <Container className='grid gap-6 py-14 lg:grid-cols-2'>
                <Skeleton className='h-72' />
                <Skeleton className='h-72' />
            </Container>
        )
    }

    const state = ticketScreenState(booking, isError)

    if (state || !booking) {
        return (
            <StateScreen
                {...TICKET_PAGE[state ?? 'notFound']}
                actionLabel={TICKET_PAGE.explore}
                actionTo={PATHS.events}
            />
        )
    }

    return (
        <Container className='space-y-8 py-10 md:py-14'>
            <div className='max-w-2xl space-y-3'>
                <Text variant='meta'>{TICKET_PAGE.eyebrow}</Text>
                <Text
                    as='h1'
                    variant='display'>
                    {TICKET_PAGE.title}
                </Text>
                <Text
                    variant='lead'
                    tone='secondary'>
                    {TICKET_PAGE.lead}
                </Text>
            </div>
            <div className='grid gap-6 lg:grid-cols-12'>
                <div className='lg:col-span-7'>
                    <TicketList tickets={booking.tickets} />
                </div>
                <div className='space-y-4 lg:col-span-5'>
                    <TicketDetails booking={booking} />
                    <Button
                        asChild
                        variant='secondary'
                        className='w-full'>
                        <Link to={PATHS.events}>{TICKET_PAGE.explore}</Link>
                    </Button>
                </div>
            </div>
        </Container>
    )
}
