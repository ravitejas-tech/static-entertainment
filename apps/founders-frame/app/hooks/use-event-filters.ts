import { useState } from 'react'
import { countTypes } from '~/lib/agenda'
import type { EventSummary } from '~/types/events'

export function useEventFilters(events: EventSummary[]) {
    const [type, setType] = useState<string | null>(null)

    return {
        type,
        setType,
        clear: () => setType(null),
        types: countTypes(events),
        visible: events.filter((event) => !type || event.categoryLabel === type),
    }
}
