import { DuplicateEventButton } from '~/components/events/duplicate-event-button'
import { PauseSalesButton } from '~/components/events/header/pause-sales-button'
import { PublishButton } from '~/components/events/header/publish-button'
import { ExternalLinkButton } from '~/components/ui/external-link-button'
import { EVENT_HEADER_COPY } from '~/data/events/copy'
import { useSiteUrl } from '~/hooks/communities/use-site-url'
import { useCan } from '~/hooks/staff/use-can'
import { eventPreviewUrl, eventPublicUrl } from '~/lib/website'
import type { EventRow } from '~/types/events'

export function EventActions({ event }: { event: EventRow }) {
    const canEdit = useCan('editEvents')
    const published = event.status === 'published'
    const siteUrl = useSiteUrl(event.community)

    return (
        <div className='grid grid-cols-2 gap-2 sm:flex sm:flex-wrap'>
            {canEdit && (
                <PublishButton
                    event={event}
                    className='col-span-2 sm:col-span-1'
                />
            )}
            {canEdit && published && <PauseSalesButton event={event} />}
            {siteUrl &&
                (published ? (
                    <ExternalLinkButton href={eventPublicUrl(siteUrl, event.slug)}>
                        {EVENT_HEADER_COPY.viewLive}
                    </ExternalLinkButton>
                ) : (
                    <ExternalLinkButton href={eventPreviewUrl(siteUrl, event)}>
                        {EVENT_HEADER_COPY.preview}
                    </ExternalLinkButton>
                ))}
            {canEdit && <DuplicateEventButton eventId={event.id} />}
        </div>
    )
}
