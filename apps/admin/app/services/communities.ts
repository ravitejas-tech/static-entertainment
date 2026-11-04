import { supabase } from '~/services/supabase'

export async function listCommunities() {
    const { data, error } = await supabase.from('communities').select('*').order('name')
    if (error) throw error
    return data
}
