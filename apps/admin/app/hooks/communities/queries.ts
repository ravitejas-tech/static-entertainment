import { createQuery } from 'react-query-kit'
import { listCommunities } from '~/services/communities'

export const useCommunities = createQuery({
    queryKey: ['communities'],
    fetcher: listCommunities,
    staleTime: Infinity,
})
