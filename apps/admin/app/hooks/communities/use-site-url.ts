import { useCommunities } from '~/hooks/communities/queries'

export function useSiteUrl(community: string) {
    const { data: communities = [] } = useCommunities()
    return communities.find(({ slug }) => slug === community)?.site_url ?? null
}
