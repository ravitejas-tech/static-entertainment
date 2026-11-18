import { EventDetailsForm } from '~/components/events/details/event-details-form'
import { Notice } from '~/components/ui/notice'
import { Spinner } from '~/components/ui/spinner'
import { ERROR_COPY, LOADING_LABEL } from '~/data/ui/feedback'
import { useEventCategories } from '~/hooks/events/queries'
import { useEventOutlet } from '~/hooks/events/use-event-outlet'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('viewEvents')
    return null
}

export default function EventDetails() {
    const { event } = useEventOutlet()
    const { data: categories, isError } = useEventCategories({ variables: event.community })

    if (isError) return <Notice tone='pink'>{ERROR_COPY.failed.details}</Notice>
    if (!categories) return <Spinner label={LOADING_LABEL} />

    return (
        <EventDetailsForm
            key={event.id}
            event={event}
            categories={categories}
        />
    )
}
