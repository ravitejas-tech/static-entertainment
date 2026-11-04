import { supabase } from '~/services/supabase'

export async function listEventCategories(community: string) {
    const { data, error } = await supabase
        .from('event_categories')
        .select('*')
        .eq('community', community)
        .order('sort_order')
    if (error) throw error
    return data
}
