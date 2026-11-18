import type { Config } from '@react-router/dev/config'
import { loadEnv } from 'vite'
import { COMMUNITY_SLUG } from './app/data/brand'
import { eventPath, PLACEHOLDER_EVENT_SLUG, PUBLIC_PAGES } from './app/data/navigation'
import { SEO_FILES } from './app/data/seo/routes'

async function publishedEventPaths() {
    const { VITE_SUPABASE_URL: url, VITE_SUPABASE_PUBLISHABLE_KEY: key } = loadEnv(
        process.env.NODE_ENV ?? 'production',
        process.cwd(),
        'VITE_',
    )
    if (!url || !key) throw new Error('Prerender: set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.')

    const response = await fetch(
        `${url}/rest/v1/events?select=slug&status=eq.published&community=eq.${COMMUNITY_SLUG}`,
        { headers: { apikey: key } },
    ).catch((cause: unknown) => {
        throw new Error(
            `Prerender: Supabase at ${url} is unreachable, so the event pages cannot be built. Check VITE_SUPABASE_URL and build again.`,
            { cause },
        )
    })
    if (!response.ok) {
        throw new Error(`Prerender: Supabase answered ${response.status} when listing published events.`)
    }

    const events = (await response.json()) as { slug: string }[]
    const slugs = events.length > 0 ? events.map(({ slug }) => slug) : [PLACEHOLDER_EVENT_SLUG]
    return slugs.map((slug) => eventPath(slug))
}

export default {
    appDirectory: 'app',
    ssr: false,
    async prerender() {
        return [...PUBLIC_PAGES, ...(await publishedEventPaths()), ...Object.values(SEO_FILES)]
    },
} satisfies Config
