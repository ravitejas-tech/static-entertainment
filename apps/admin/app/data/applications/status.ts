import type { PopTone } from '~/data/ui/pop-tones'
import type { ApplicationStatus } from '~/types/applications'

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
    pending: 'Under review',
    approved: 'Approved',
    waitlisted: 'Waitlisted',
    rejected: 'Not selected',
    confirmed: 'Confirmed',
    withdrawn: 'Withdrawn',
}

export const APPLICATION_STATUS_TONES: Record<ApplicationStatus, PopTone | 'muted'> = {
    pending: 'yellow',
    approved: 'cyan',
    waitlisted: 'violet',
    rejected: 'muted',
    confirmed: 'lime',
    withdrawn: 'muted',
}

export const APPLICATION_FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: APPLICATION_STATUS_LABELS.pending },
    { value: 'approved', label: APPLICATION_STATUS_LABELS.approved },
    { value: 'waitlisted', label: APPLICATION_STATUS_LABELS.waitlisted },
    { value: 'rejected', label: APPLICATION_STATUS_LABELS.rejected },
    { value: 'confirmed', label: APPLICATION_STATUS_LABELS.confirmed },
] as const

export const REVIEW_DECISIONS = [
    { status: 'approved', label: 'Approve', variant: 'primary' },
    { status: 'waitlisted', label: 'Waitlist', variant: 'secondary' },
    { status: 'rejected', label: 'Not selected', variant: 'danger' },
] as const

export const CLOSED_STATUSES: readonly ApplicationStatus[] = ['confirmed', 'withdrawn']

export const NOTE_MAX_LENGTH = 1000
