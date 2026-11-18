import { COMMUNITY_STORAGE_KEY, DEFAULT_COMMUNITY } from '~/data/communities/selection'

const listeners = new Set<() => void>()

export function getSelectedCommunity() {
    try {
        return localStorage.getItem(COMMUNITY_STORAGE_KEY) ?? DEFAULT_COMMUNITY
    } catch {
        return DEFAULT_COMMUNITY
    }
}

export function selectCommunity(slug: string) {
    try {
        localStorage.setItem(COMMUNITY_STORAGE_KEY, slug)
    } catch {
        return
    } finally {
        listeners.forEach((listener) => listener())
    }
}

export function subscribeCommunity(listener: () => void) {
    listeners.add(listener)
    return () => {
        listeners.delete(listener)
    }
}
