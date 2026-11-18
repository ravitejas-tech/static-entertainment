import { TicketScreen } from '~/components/tickets/ticket-screen'
import { QueryProvider } from '~/components/ui/query-provider'
import { ticketPath } from '~/data/navigation'
import { NOINDEX } from '~/data/seo/site'
import { TICKET_PAGE } from '~/data/tickets/page'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/tickets.$token'

export const meta: Route.MetaFunction = ({ params }) =>
    buildPageMeta({ ...TICKET_PAGE.meta, path: ticketPath(params.token), robots: NOINDEX })

export default function TicketPage({ params: { token } }: Route.ComponentProps) {
    return (
        <QueryProvider>
            <TicketScreen token={token} />
        </QueryProvider>
    )
}
