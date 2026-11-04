import { eventPath, PUBLIC_PAGES } from '~/data/navigation'
import { EVENT_SITEMAP_SETTINGS, SITEMAP_SETTINGS } from '~/data/seo/sitemap'
import { absoluteUrl } from '~/lib/seo/url'
import type { EventSummary } from '~/types/events'

export function buildSitemap(events: EventSummary[], today: string) {
    const entries = [
        ...PUBLIC_PAGES.map((path) => ({ path, lastmod: today, ...SITEMAP_SETTINGS[path] })),
        ...events.map(({ slug, updatedAt, ended }) => ({
            path: eventPath(slug),
            lastmod: updatedAt.slice(0, 10),
            ...EVENT_SITEMAP_SETTINGS[ended ? 'past' : 'upcoming'],
        })),
    ]
    const urls = entries.map(({ path, lastmod, changefreq, priority }) =>
        [
            '  <url>',
            `    <loc>${absoluteUrl(path)}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            `    <changefreq>${changefreq}</changefreq>`,
            `    <priority>${priority}</priority>`,
            '  </url>',
        ].join('\n'),
    )

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}
