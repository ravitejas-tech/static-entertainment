import { FilterChip } from '~/components/ui/filter-chip'
import { EVENTS_FILTERS } from '~/data/events/meta'
import type { TypeCount } from '~/types/events'

export interface EventFiltersProps {
    total: number
    type: string | null
    types: TypeCount[]
    onType: (type: string | null) => void
}

export function EventFilters({ total, type, types, onType }: EventFiltersProps) {
    return (
        <div
            role='group'
            aria-label={EVENTS_FILTERS.label}
            className='-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 scrollbar-none md:mx-0 md:mb-10 md:flex-wrap md:overflow-visible md:rounded-2xl md:border md:border-border md:bg-surface md:p-3 md:shadow-card'>
            <FilterChip
                label={EVENTS_FILTERS.all}
                count={total}
                pressed={type === null}
                onPress={() => onType(null)}
            />
            {types.map(({ label, count }) => (
                <FilterChip
                    key={label}
                    label={label}
                    count={count}
                    pressed={type === label}
                    onPress={() => onType(label)}
                />
            ))}
        </div>
    )
}
