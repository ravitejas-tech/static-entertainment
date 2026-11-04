import { APPLICATIONS_COPY } from '~/data/applications/copy'
import { APPLICATION_FILTERS, APPLICATION_STATUS_LABELS, CLOSED_STATUSES } from '~/data/applications/status'
import { formatCount } from '~/lib/format'
import { Constants } from '~/types/database'
import type { Application, ApplicationFilter, ApplicationStatus } from '~/types/applications'

const isApplicationStatus = (value: string): value is ApplicationStatus =>
    Constants.public.Enums.application_status.some((status) => status === value)

export const applicationStatusLabel = (value: string | null | undefined) =>
    value && isApplicationStatus(value) ? APPLICATION_STATUS_LABELS[value] : (value ?? '')

export const isClosed = (status: ApplicationStatus) => CLOSED_STATUSES.includes(status)

export const applicantProfile = ({ customers }: Application) => customers.member_profiles

export const countWithStatus = (applications: readonly Application[], status: ApplicationStatus) =>
    applications.filter((application) => application.status === status).length

export const applicationFilterOptions = (applications: readonly Application[]) =>
    APPLICATION_FILTERS.map(({ value, label }) => ({
        value,
        label: APPLICATIONS_COPY.filterCount(
            label,
            formatCount(value === 'all' ? applications.length : countWithStatus(applications, value)),
        ),
    }))

export function matchesApplication(application: Application, search: string, filter: ApplicationFilter) {
    if (filter !== 'all' && application.status !== filter) return false
    const wanted = search.trim().toLowerCase()
    const company = applicantProfile(application)?.companies?.name ?? ''
    return (
        !wanted ||
        [application.name, application.email, application.phone, company].some((value) =>
            value.toLowerCase().includes(wanted),
        )
    )
}
