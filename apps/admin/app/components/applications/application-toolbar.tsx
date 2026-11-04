import { SearchInput } from '~/components/ui/search-input'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Text } from '~/components/ui/text'
import { APPLICATIONS_COPY } from '~/data/applications/copy'
import type { ApplicationFilter } from '~/types/applications'

export interface ApplicationToolbarProps {
    summary: string
    filterOptions: readonly { value: ApplicationFilter; label: string }[]
    filter: ApplicationFilter
    search: string
    onFilter: (filter: ApplicationFilter) => void
    onSearch: (search: string) => void
}

export function ApplicationToolbar({
    summary,
    filterOptions,
    filter,
    search,
    onFilter,
    onSearch,
}: ApplicationToolbarProps) {
    return (
        <div className='space-y-3'>
            <Text
                variant='label'
                role='status'>
                {summary}
            </Text>
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                <SegmentedControl
                    label={APPLICATIONS_COPY.filterLabel}
                    options={filterOptions}
                    value={filter}
                    onChange={onFilter}
                />
                <SearchInput
                    value={search}
                    onValueChange={onSearch}
                    clearLabel={APPLICATIONS_COPY.clearSearch}
                    aria-label={APPLICATIONS_COPY.searchLabel}
                    placeholder={APPLICATIONS_COPY.searchPlaceholder}
                    className='md:w-80'
                />
            </div>
        </div>
    )
}
