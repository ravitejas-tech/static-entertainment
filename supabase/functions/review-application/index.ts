import '@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from '@supabase/server'
import { deliverApplicationEmailQuietly } from '../_shared/delivery.ts'
import { fail, ok, readJson } from '../_shared/responses.ts'
import { requireStaffRole } from '../_shared/staff.ts'

const REVIEW_STATUSES = ['approved', 'waitlisted', 'rejected'] as const

interface ReviewApplicationRequest {
    applicationId: string
    status: (typeof REVIEW_STATUSES)[number]
    note?: string
    notify?: boolean
}

export default {
    fetch: withSupabase({ auth: 'user' }, async (req, { supabase, supabaseAdmin }) => {
        try {
            await requireStaffRole(supabase, ['super_admin', 'event_manager'])
            const { applicationId, status, note = '', notify = true } = await readJson<ReviewApplicationRequest>(req)
            if (!REVIEW_STATUSES.includes(status)) throw new Error('bad_request')

            const { data: before } = await supabaseAdmin
                .from('applications')
                .select('status')
                .eq('id', applicationId)
                .maybeSingle()
            if (!before) throw new Error('application_not_found')

            const { data: application, error } = await supabase.rpc('review_application', {
                p_application_id: applicationId,
                p_status: status,
                p_note: note,
            })
            if (error) throw error

            const emailed =
                notify && before.status !== status
                    ? await deliverApplicationEmailQuietly(supabaseAdmin, applicationId, status)
                    : false
            return ok({ application: { id: application.id, status: application.status }, emailed })
        } catch (error) {
            return fail(error)
        }
    }),
}
