import { useState } from 'react'
import { countFormats, typeOptions } from '~/lib/agenda'
import type { EventFormat, EventSummary } from '~/types/events'

export function useEventFilters(events: EventSummary[]) {
    const [format, setFormat] = useState<EventFormat | null>(null)
    const [type, setType] = useState('')

    return {
        format,
        type,
        setFormat,
        setType,
        clear: () => {
            setFormat(null)
            setType('')
        },
        formats: countFormats(events),
        types: typeOptions(events),
        visible: events.filter(
            (event) => (!format || event.format === format) && (!type || event.categoryLabel === type),
        ),
    }
}
