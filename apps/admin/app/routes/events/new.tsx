import { NewEventForm } from '~/components/events/create/new-event-form'
import { Notice } from '~/components/ui/notice'
import { PageHeader } from '~/components/ui/page-header'
import { Spinner } from '~/components/ui/spinner'
import { NEW_EVENT_COPY } from '~/data/events/copy'
import { ERROR_COPY, LOADING_LABEL } from '~/data/ui/feedback'
import { useCommunity } from '~/hooks/communities/use-community'
import { useEventCategories } from '~/hooks/events/queries'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('editEvents')
    return null
}

export default function NewEvent() {
    const { slug: community } = useCommunity()
    const { data: categories, isError } = useEventCategories({ variables: community })

    return (
        <>
            <PageHeader
                title={NEW_EVENT_COPY.title}
                description={NEW_EVENT_COPY.description}
            />
            {isError && <Notice tone='pink'>{ERROR_COPY.failed.details}</Notice>}
            {!isError && !categories && <Spinner label={LOADING_LABEL} />}
            {categories && (
                <NewEventForm
                    key={community}
                    community={community}
                    categories={categories}
                />
            )}
        </>
    )
}
