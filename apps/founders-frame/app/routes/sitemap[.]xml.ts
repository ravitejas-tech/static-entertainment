import { buildSitemap } from '~/lib/seo/sitemap'

export async function loader() {
    const { loadEventSummaries } = await import('~/services/event-catalog')
    const today = new Date().toISOString().slice(0, 10)
    return new Response(buildSitemap(await loadEventSummaries(), today), {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
}
