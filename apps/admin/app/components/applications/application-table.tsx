import type { ReactNode } from 'react'
import { ApplicationStatusBadge } from '~/components/applications/application-status-badge'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/ui/data-table'
import { StackedCell } from '~/components/ui/stacked-cell'
import { APPLICATIONS_COPY } from '~/data/applications/copy'
import { PROFILE_COPY } from '~/data/members/copy'
import { MEMBER_TYPE_LABELS } from '~/data/members/options'
import { applicantProfile, isClosed } from '~/lib/applications'
import { formatDateTime } from '~/lib/format'
import type { Application } from '~/types/applications'
import type { TableColumn } from '~/types/table'

const { columns, caption } = APPLICATIONS_COPY

const APPLICATION_COLUMNS: TableColumn<Application>[] = [
    {
        key: 'name',
        header: columns.name,
        cell: ({ name, email }) => (
            <StackedCell
                main={name}
                sub={email}
            />
        ),
        wideOnPhone: true,
    },
    { key: 'status', header: columns.status, cell: ({ status }) => <ApplicationStatusBadge status={status} /> },
    { key: 'seat', header: columns.seat, cell: ({ ticket_types }) => ticket_types.name, nowrap: true },
    {
        key: 'member-type',
        header: columns.memberType,
        cell: (application) => {
            const profile = applicantProfile(application)
            return profile ? MEMBER_TYPE_LABELS[profile.member_type] : PROFILE_COPY.none
        },
        nowrap: true,
    },
    {
        key: 'company',
        header: columns.company,
        cell: (application) => applicantProfile(application)?.companies?.name ?? PROFILE_COPY.none,
    },
    { key: 'phone', header: columns.phone, cell: ({ phone }) => phone, hideOnPhone: true, nowrap: true },
    { key: 'applied', header: columns.applied, cell: ({ created_at }) => formatDateTime(created_at), nowrap: true },
]

export interface ApplicationTableProps {
    applications: Application[]
    canReview: boolean
    onOpen: (application: Application) => void
    empty: ReactNode
}

export function ApplicationTable({ applications, canReview, onOpen, empty }: ApplicationTableProps) {
    const actionColumn: TableColumn<Application> = {
        key: 'actions',
        header: columns.actions,
        cell: (application) => (
            <Button
                variant={canReview && !isClosed(application.status) ? 'primary' : 'secondary'}
                size='sm'
                onClick={() => onOpen(application)}>
                {canReview && !isClosed(application.status) ? APPLICATIONS_COPY.review : APPLICATIONS_COPY.view}
            </Button>
        ),
        wideOnPhone: true,
    }

    return (
        <DataTable
            columns={[...APPLICATION_COLUMNS, actionColumn]}
            rows={applications}
            rowKey={({ id }) => id}
            caption={caption}
            empty={empty}
        />
    )
}
