import { COMMUNITY_FEATURES, NO_FEATURES } from '~/data/communities/features'

export const communityFeatures = (community: string) => COMMUNITY_FEATURES[community] ?? NO_FEATURES
