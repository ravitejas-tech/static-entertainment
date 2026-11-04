import { BOOK_SEGMENT, PATHS, type PublicPage } from '~/data/navigation'

export interface SitemapSettings {
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
    priority: string
}

export const SITEMAP_SETTINGS: Record<PublicPage, SitemapSettings> = {
    [PATHS.home]: { changefreq: 'weekly', priority: '1.0' },
    [PATHS.events]: { changefreq: 'daily', priority: '0.9' },
    [PATHS.about]: { changefreq: 'monthly', priority: '0.6' },
}

export const EVENT_SITEMAP_SETTINGS: Record<'upcoming' | 'past', SitemapSettings> = {
    upcoming: { changefreq: 'daily', priority: '0.8' },
    past: { changefreq: 'yearly', priority: '0.4' },
}

export const ROBOTS_DISALLOW = [`${PATHS.tickets}/`, `${PATHS.events}/*/${BOOK_SEGMENT}`]
