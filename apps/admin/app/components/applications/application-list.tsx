import { useState } from 'react'
import { ApplicationReviewDialog } from '~/components/applications/application-review-dialog'
import { ApplicationTable } from '~/components/applications/application-table'
import { ApplicationToolbar } from '~/components/applications/application-toolbar'
import { EmptyState } from '~/components/ui/empty-state'
import { Notice } from '~/components/ui/notice'
import { Spinner } from '~/components/ui/spinner'
import { APPLICATIONS_COPY } from '~/data/applications/copy'
import { ERROR_COPY, LOADING_LABEL } from '~/data/ui/feedback'
import { useApplications } from '~/hooks/applications/queries'
import { useCan } from '~/hooks/staff/use-can'
import { applicationFilterOptions, countWithStatus, matchesApplication } from '~/lib/applications'
import { formatCount } from '~/lib/format'
import type { ApplicationFilter } from '~/types/applications'
import type { EventRow } from '~/types/events'

export function ApplicationList({ event }: { event: EventRow }) {
    const canReview = useCan('reviewApplications')
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<ApplicationFilter>('all')
    const [openId, setOpenId] = useState<string | null>(null)
    const { data: applications = [], isPending, isError } = useApplications({ variables: event.id })
    const rows = applications.filter((application) => matchesApplication(application, search, filter))
    const open = applications.find(({ id }) => id === openId)

    return (
        <div className='space-y-5'>
            <ApplicationToolbar
                summary={APPLICATIONS_COPY.summary(
                    formatCount(applications.length),
                    formatCount(countWithStatus(applications, 'pending')),
                )}
                filterOptions={applicationFilterOptions(applications)}
                filter={filter}
                search={search}
                onFilter={setFilter}
                onSearch={setSearch}
            />
            {isPending && <Spinner label={LOADING_LABEL} />}
            {isError && <Notice tone='pink'>{ERROR_COPY.failed.details}</Notice>}
            {!isPending && !isError && (
                <ApplicationTable
                    applications={rows}
                    canReview={canReview}
                    onOpen={({ id }) => setOpenId(id)}
                    empty={
                        <EmptyState
                            {...(applications.length === 0 ? APPLICATIONS_COPY.empty : APPLICATIONS_COPY.noMatches)}
                        />
                    }
                />
            )}
            {open && (
                <ApplicationReviewDialog
                    key={open.id}
                    application={open}
                    questions={event.questions}
                    onClose={() => setOpenId(null)}
                />
            )}
        </div>
    )
}
