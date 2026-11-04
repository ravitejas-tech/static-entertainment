import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'
import { SEO_FILES } from './data/seo/routes'

export default [
    layout('routes/layout.tsx', [
        index('routes/index.tsx'),
        route('events', 'routes/events/index.tsx'),
        route('events/:slug', 'routes/events/$slug.tsx'),
        route('events/:slug/rsvp', 'routes/events/$slug.rsvp.tsx'),
        route('events/:slug/apply', 'routes/events/$slug.apply.tsx'),
        route('applications/:token', 'routes/applications.$token.tsx'),
        route('tickets/:token', 'routes/tickets.$token.tsx'),
        route('about', 'routes/about.tsx'),
    ]),
    route(SEO_FILES.robots, 'routes/robots[.]txt.ts'),
    route(SEO_FILES.sitemap, 'routes/sitemap[.]xml.ts'),
    route(SEO_FILES.manifest, 'routes/manifest[.]webmanifest.ts'),
] satisfies RouteConfig
