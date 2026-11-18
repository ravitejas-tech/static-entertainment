import { z } from 'zod'
import { bookingSchema } from '~/schemas/booking'
import { supabase } from '~/services/supabase'

export async function getBooking(accessToken: string) {
    if (!z.uuid().safeParse(accessToken).success) return null
    const { data, error } = await supabase.rpc('get_booking', { p_access_token: accessToken })
    if (error) throw new Error(error.message)
    return data === null ? null : bookingSchema.parse(data)
}
