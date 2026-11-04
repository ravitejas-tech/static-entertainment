import { MEMBER_PROFILE_COLUMNS } from '~/data/members/query'
import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import type { ReviewRequest, ReviewResult } from '~/types/applications'

const APPLICATION_COLUMNS =
    `id, name, email, phone, answers, status, review_note, reviewed_at, created_at, customer_id, ticket_types(name), customers(member_profiles(${MEMBER_PROFILE_COLUMNS}))` as const

export async function listApplications(eventId: string) {
    const { data, error } = await supabase
        .from('applications')
        .select(APPLICATION_COLUMNS)
        .eq('event_id', eventId)
        .order('created_at', { ascending: false })
    if (error) throw error
    return data
}

export async function countPendingApplications(eventId: string) {
    const { count, error } = await supabase
        .from('applications')
        .select('id', { count: 'exact', head: true })
        .eq('event_id', eventId)
        .eq('status', 'pending')
    if (error) throw error
    return count ?? 0
}

export async function reviewApplication({ applicationId, status, note }: ReviewRequest) {
    return invokeFunction<ReviewResult>('review-application', { applicationId, status, note: note.trim() })
}
