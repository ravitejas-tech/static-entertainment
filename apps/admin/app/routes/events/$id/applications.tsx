import { ApplicationList } from '~/components/applications/application-list'
import { EmptyState } from '~/components/ui/empty-state'
import { APPLICATIONS_COPY } from '~/data/applications/copy'
import { useEventOutlet } from '~/hooks/events/use-event-outlet'
import { communityFeatures } from '~/lib/communities'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('viewApplications')
    return null
}

export default function EventApplications() {
    const { event } = useEventOutlet()

    if (!communityFeatures(event.community).applications) return <EmptyState {...APPLICATIONS_COPY.notUsed} />

    return <ApplicationList event={event} />
}
