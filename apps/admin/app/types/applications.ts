import type { APPLICATION_FILTERS } from '~/data/applications/status'
import type { listApplications } from '~/services/applications'
import type { Enums } from '~/types/database'

export type ApplicationStatus = Enums<'application_status'>

export type ReviewStatus = Extract<ApplicationStatus, 'approved' | 'waitlisted' | 'rejected'>

export type ApplicationFilter = (typeof APPLICATION_FILTERS)[number]['value']

export type Application = Awaited<ReturnType<typeof listApplications>>[number]

export interface ReviewRequest {
    applicationId: string
    name: string
    status: ReviewStatus
    note: string
}

export interface ReviewResult {
    application: { id: string; status: ApplicationStatus }
    emailed: boolean
}
