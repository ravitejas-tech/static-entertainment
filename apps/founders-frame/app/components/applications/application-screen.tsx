import { ApplicationActions } from '~/components/applications/application-actions'
import { ApplicationStatusCard } from '~/components/applications/application-status'
import { Container } from '~/components/ui/container'
import { Skeleton } from '~/components/ui/skeleton'
import { StateScreen } from '~/components/ui/state-screen'
import { Text } from '~/components/ui/text'
import { APPLICATION_PAGE } from '~/data/applications/page'
import { PATHS } from '~/data/navigation'
import { useApplication } from '~/hooks/applications/queries'

export function ApplicationScreen({ token }: { token: string }) {
    const { data: application, isPending, isError } = useApplication({ variables: token })

    if (isPending) {
        return (
            <Container className='max-w-3xl space-y-4 py-14'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-80 w-full' />
            </Container>
        )
    }

    if (isError || !application) {
        return (
            <StateScreen
                {...(isError ? APPLICATION_PAGE.loadFailed : APPLICATION_PAGE.notFound)}
                actionLabel={APPLICATION_PAGE.explore}
                actionTo={PATHS.events}
            />
        )
    }

    return (
        <Container className='max-w-3xl space-y-6 py-10 md:py-14'>
            <Text variant='meta'>{APPLICATION_PAGE.eyebrow}</Text>
            <ApplicationStatusCard application={application} />
            <ApplicationActions
                token={token}
                application={application}
            />
        </Container>
    )
}
