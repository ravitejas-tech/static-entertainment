import { MEMBER_PROFILE_COLUMNS } from '~/data/members/query'
import { supabase } from '~/services/supabase'

export async function getMemberProfile(customerId: string) {
    const { data, error } = await supabase
        .from('member_profiles')
        .select(MEMBER_PROFILE_COLUMNS)
        .eq('customer_id', customerId)
        .maybeSingle()
    if (error) throw error
    return data
}
