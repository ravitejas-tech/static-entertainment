import { Link, useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { APPLICATION_PAGE } from '~/data/applications/page'
import { eventPath, PATHS, ticketPath } from '~/data/navigation'
import { useConfirmApplication } from '~/hooks/registration/mutations'
import type { Application } from '~/types/application'

export interface ApplicationActionsProps {
    token: string
    application: Application
}

export function ApplicationActions({ token, application }: ApplicationActionsProps) {
    const navigate = useNavigate()
    const { mutate, isPending } = useConfirmApplication()
    const { status, ticket_access_token, event } = application

    return (
        <div className='grid gap-3 sm:flex'>
            {status === 'approved' && (
                <Button
                    disabled={isPending}
                    onClick={() =>
                        mutate(token, { onSuccess: ({ order }) => navigate(ticketPath(order.accessToken)) })
                    }>
                    {isPending && <Spinner />}
                    {isPending ? APPLICATION_PAGE.confirming : APPLICATION_PAGE.confirm}
                </Button>
            )}
            {status === 'confirmed' && ticket_access_token && (
                <Button asChild>
                    <Link to={ticketPath(ticket_access_token)}>{APPLICATION_PAGE.viewTicket}</Link>
                </Button>
            )}
            <Button
                asChild
                variant='secondary'>
                <Link to={status === 'rejected' || status === 'withdrawn' ? PATHS.events : eventPath(event.slug)}>
                    {status === 'rejected' || status === 'withdrawn'
                        ? APPLICATION_PAGE.explore
                        : APPLICATION_PAGE.viewEvent}
                </Link>
            </Button>
        </div>
    )
}
