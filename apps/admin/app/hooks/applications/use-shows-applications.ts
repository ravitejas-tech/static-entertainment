import { useCan } from '~/hooks/staff/use-can'
import { communityFeatures } from '~/lib/communities'

export function useShowsApplications(community: string) {
    const canView = useCan('viewApplications')
    return canView && communityFeatures(community).applications
}
