import { FilterChip } from '~/components/ui/filter-chip'
import { Select } from '~/components/ui/select'
import { EVENT_FORMATS } from '~/data/events/formats'
import { EVENTS_FILTERS } from '~/data/events/meta'
import type { EventFormat, FormatCount } from '~/types/events'
import type { Option } from '~/types/options'

export interface EventFiltersProps {
    total: number
    format: EventFormat | null
    formats: FormatCount[]
    type: string
    types: Option[]
    onFormat: (format: EventFormat | null) => void
    onType: (type: string) => void
}

export function EventFilters({ total, format, formats, type, types, onFormat, onType }: EventFiltersProps) {
    return (
        <div className='mb-6 flex flex-col gap-3 md:mb-10 md:flex-row md:items-center md:justify-between md:rounded-2xl md:border md:border-border md:bg-surface md:p-3 md:shadow-card'>
            <div
                role='group'
                aria-label={EVENTS_FILTERS.label}
                className='-mx-5 flex gap-2 overflow-x-auto px-5 scrollbar-none md:mx-0 md:px-0'>
                <FilterChip
                    label={EVENTS_FILTERS.all}
                    count={total}
                    pressed={format === null}
                    onPress={() => onFormat(null)}
                />
                {formats.map(({ format: value, count }) => (
                    <FilterChip
                        key={value}
                        label={EVENT_FORMATS[value].label}
                        count={count}
                        pressed={format === value}
                        onPress={() => onFormat(value)}
                    />
                ))}
            </div>
            {types.length > 1 && (
                <Select
                    aria-label={EVENTS_FILTERS.type}
                    placeholder={EVENTS_FILTERS.allTypes}
                    options={types}
                    value={type}
                    onChange={(event) => onType(event.target.value)}
                    className='hidden md:flex md:w-60'
                />
            )}
        </div>
    )
}
