import { Select } from '~/components/ui/select'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { useCommunity } from '~/hooks/communities/use-community'
import { useEvents } from '~/hooks/events/queries'
import { eventOptions } from '~/lib/event-list'

export interface EventPickerProps {
    value: string
    onChange: (eventId: string) => void
}

export function EventPicker({ value, onChange }: EventPickerProps) {
    const { slug: community } = useCommunity()
    const { data: events = [] } = useEvents({ variables: community })

    return (
        <Select
            aria-label={DASHBOARD_COPY.eventLabel}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            options={eventOptions(events)}
            placeholder={DASHBOARD_COPY.allEvents}
            className='sm:w-80 lg:w-96'
        />
    )
}
