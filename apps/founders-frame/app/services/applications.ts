import { z } from 'zod'
import { applicationSchema } from '~/schemas/application'
import { supabase } from '~/services/supabase'

export async function getApplication(accessToken: string) {
    if (!z.uuid().safeParse(accessToken).success) return null
    const { data, error } = await supabase.rpc('get_application', { p_access_token: accessToken })
    if (error) throw new Error(error.message)
    return data === null ? null : applicationSchema.parse(data)
}
