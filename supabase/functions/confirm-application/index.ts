import '@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from '@supabase/server'
import { deliverTicketsQuietly } from '../_shared/delivery.ts'
import { fail, ok, readJson } from '../_shared/responses.ts'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default {
    fetch: withSupabase({ auth: ['user', 'publishable'] }, async (req, { supabaseAdmin }) => {
        try {
            const { accessToken } = await readJson<{ accessToken: string }>(req)
            if (typeof accessToken !== 'string' || !UUID.test(accessToken)) throw new Error('application_not_found')

            const { data: application } = await supabaseAdmin
                .from('applications')
                .select('status')
                .eq('access_token', accessToken)
                .maybeSingle()
            if (!application) throw new Error('application_not_found')

            const { data: order, error } = await supabaseAdmin.rpc('confirm_application', { p_access_token: accessToken })
            if (error) throw error

            if (application.status !== 'confirmed') await deliverTicketsQuietly(supabaseAdmin, order.id)
            return ok({ order: { accessToken: order.access_token, bookingCode: order.booking_code } })
        } catch (error) {
            return fail(error)
        }
    }),
}
