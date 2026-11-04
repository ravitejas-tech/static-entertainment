import type { CommunityFeatures } from '~/types/communities'

export const NO_FEATURES: CommunityFeatures = { stickers: false, audience: false, speakers: false, applications: false }

export const COMMUNITY_FEATURES: Partial<Record<string, CommunityFeatures>> = {
    echoverse: { ...NO_FEATURES, stickers: true },
    'founders-frame': { ...NO_FEATURES, audience: true, speakers: true, applications: true },
}
