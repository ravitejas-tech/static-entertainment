import { Badge } from '~/components/ui/badge'
import { APPLICATIONS_COPY } from '~/data/applications/copy'
import { eventBadges } from '~/lib/events/status'
import { formatCount } from '~/lib/format'
import type { EventRow } from '~/types/events'

export function StatusBadges({ event, pending = 0 }: { event: EventRow; pending?: number }) {
    return (
        <div className='flex flex-wrap gap-2'>
            {eventBadges(event).map(({ label, tone }) => (
                <Badge
                    key={label}
                    tone={tone}>
                    {label}
                </Badge>
            ))}
            {pending > 0 && <Badge tone='yellow'>{APPLICATIONS_COPY.pending(formatCount(pending))}</Badge>}
        </div>
    )
}
