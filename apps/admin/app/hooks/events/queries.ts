import { createQuery } from 'react-query-kit'
import { listEventCategories } from '~/services/event-categories'
import { getEvent, listEventOverviews, listEvents } from '~/services/events'

export const useEvents = createQuery({
    queryKey: ['events'],
    fetcher: (community: string) => listEvents(community),
})

export const useEventOverviews = createQuery({
    queryKey: ['events', 'overviews'],
    fetcher: (community: string) => listEventOverviews(community),
})

export const useEventCategories = createQuery({
    queryKey: ['event-categories'],
    fetcher: (community: string) => listEventCategories(community),
    staleTime: Infinity,
})

export const useEvent = createQuery({
    queryKey: ['events', 'detail'],
    fetcher: (id: string) => getEvent(id),
})
