import { keepPreviousData } from '@tanstack/react-query'
import { createQuery } from 'react-query-kit'
import { getDashboardStats } from '~/services/dashboard'
import type { DashboardScope } from '~/types/dashboard'

export const useDashboardStats = createQuery({
    queryKey: ['dashboard'],
    fetcher: (scope: DashboardScope) => getDashboardStats(scope),
    placeholderData: keepPreviousData,
})
