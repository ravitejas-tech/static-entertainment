import { createQuery } from 'react-query-kit'
import { getMemberProfile } from '~/services/members'

export const useMemberProfile = createQuery({
    queryKey: ['member-profile'],
    fetcher: (customerId: string) => getMemberProfile(customerId),
})
