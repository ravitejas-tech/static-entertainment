import { Badge } from '~/components/ui/badge'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { formatRupees } from '~/lib/format'

export function PriceBadge({ price }: { price: number | null }) {
    if (price === null) return null
    return <Badge tone='gold'>{EVENT_CARD_COPY.from(formatRupees(price))}</Badge>
}
