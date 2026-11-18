import { useSyncExternalStore } from 'react'
import { DEFAULT_COMMUNITY } from '~/data/communities/selection'
import { useCommunities } from '~/hooks/communities/queries'
import { getSelectedCommunity, selectCommunity, subscribeCommunity } from '~/lib/community-selection'

const serverCommunity = () => DEFAULT_COMMUNITY

export function useCommunity() {
    const slug = useSyncExternalStore(subscribeCommunity, getSelectedCommunity, serverCommunity)
    const { data: communities = [] } = useCommunities()
    const community = communities.find((candidate) => candidate.slug === slug)
    return { slug, community, communities, select: selectCommunity }
}
