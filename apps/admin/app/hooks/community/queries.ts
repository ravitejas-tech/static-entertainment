import { createInfiniteQuery, createQuery } from 'react-query-kit'
import { COMMUNITY_PAGE_SIZE } from '~/data/community/query'
import { getCommunityMember, getCommunityStats, listCommunityMembers, listMemberBookings } from '~/services/community'
import type { CommunityQuery, MemberRef } from '~/types/community'

export const useCommunityMembers = createInfiniteQuery({
    queryKey: ['community-members'],
    fetcher: (query: CommunityQuery, { pageParam }) => listCommunityMembers(query, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
        pages.length * COMMUNITY_PAGE_SIZE < lastPage.count ? pages.length : undefined,
})

export const useCommunityStats = createQuery({
    queryKey: ['community-stats'],
    fetcher: (community: string) => getCommunityStats(community),
})

export const useCommunityMember = createQuery({
    queryKey: ['community-member'],
    fetcher: (member: MemberRef) => getCommunityMember(member),
})

export const useMemberBookings = createQuery({
    queryKey: ['member-bookings'],
    fetcher: (member: MemberRef) => listMemberBookings(member),
})
