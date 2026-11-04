import { dashboardStatsSchema } from '~/schemas/dashboard-stats'
import { supabase } from '~/services/supabase'
import type { DashboardScope } from '~/types/dashboard'

export async function getDashboardStats({ community, eventId }: DashboardScope) {
    const { data, error } = await supabase.rpc('dashboard_stats', {
        p_community: community,
        p_event_id: eventId ?? undefined,
    })
    if (error) throw error
    return dashboardStatsSchema.parse(data)
}
