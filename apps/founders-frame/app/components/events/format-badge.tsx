import { Badge } from '~/components/ui/badge'
import { EVENT_FORMATS } from '~/data/events/formats'
import type { EventFormat } from '~/types/events'

export function FormatBadge({ format }: { format: EventFormat }) {
    return <Badge tone={EVENT_FORMATS[format].tone}>{EVENT_FORMATS[format].label}</Badge>
}
