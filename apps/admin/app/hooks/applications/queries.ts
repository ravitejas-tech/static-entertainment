import { createQuery } from 'react-query-kit'
import { countPendingApplications, listApplications } from '~/services/applications'

export const useApplications = createQuery({
    queryKey: ['applications'],
    fetcher: (eventId: string) => listApplications(eventId),
})

export const usePendingApplications = createQuery({
    queryKey: ['applications', 'pending'],
    fetcher: (eventId: string) => countPendingApplications(eventId),
})
