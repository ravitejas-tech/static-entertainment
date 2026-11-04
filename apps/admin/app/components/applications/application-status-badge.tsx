import { Badge } from '~/components/ui/badge'
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_TONES } from '~/data/applications/status'
import type { ApplicationStatus } from '~/types/applications'

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
    return <Badge tone={APPLICATION_STATUS_TONES[status]}>{APPLICATION_STATUS_LABELS[status]}</Badge>
}
