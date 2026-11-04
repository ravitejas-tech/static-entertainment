import '@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from '@supabase/server'
import { deliverApplicationEmailQuietly } from '../_shared/delivery.ts'
import { type MemberProfileInput, toProfileJson } from '../_shared/profile.ts'
import { fail, ok, readJson } from '../_shared/responses.ts'

interface SubmitApplicationRequest {
    eventId: string
    ticketTypeId: string
    applicant: { name: string; email: string; phone: string }
    answers?: Record<string, string>
    profile: MemberProfileInput
    marketingConsent?: boolean
    termsAccepted: boolean
}

export default {
    fetch: withSupabase({ auth: ['user', 'publishable'] }, async (req, { supabaseAdmin }) => {
        try {
            const body = await readJson<SubmitApplicationRequest>(req)
            if (body.termsAccepted !== true || !body.applicant || !body.profile) throw new Error('bad_request')

            const { data: application, error } = await supabaseAdmin.rpc('submit_application', {
                p_event_id: body.eventId,
                p_ticket_type_id: body.ticketTypeId,
                p_name: body.applicant.name,
                p_email: body.applicant.email,
                p_phone: body.applicant.phone,
                p_answers: body.answers ?? {},
                p_profile: toProfileJson(body.profile),
                p_marketing_consent: body.marketingConsent === true,
            })
            if (error) throw error

            await deliverApplicationEmailQuietly(supabaseAdmin, application.id, 'received')
            return ok({ application: { accessToken: application.access_token, status: application.status } })
        } catch (error) {
            return fail(error)
        }
    }),
}
