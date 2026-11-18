import { data, redirect } from 'react-router'
import { EventPage } from '~/components/events/detail/event-page'
import { EventPageSkeleton } from '~/components/events/detail/event-page-skeleton'
import { PREVIEW_PARAM } from '~/data/events/page'
import { PATHS } from '~/data/navigation'
import { buildEventMeta } from '~/lib/seo/event-meta'
import type { Route } from './+types/$slug'

async function loadPage(slug: string, request: Request) {
    const { loadEventPage } = await import('~/services/event-catalog')
    return loadEventPage(slug, new URL(request.url).searchParams.get(PREVIEW_PARAM))
}

export async function loader({ params, request }: Route.LoaderArgs) {
    const page = await loadPage(params.slug, request)
    if (!page) throw redirect(PATHS.events)
    return page
}

export async function clientLoader({ params, request }: Route.ClientLoaderArgs) {
    const page = await loadPage(params.slug, request)
    if (!page) throw data(null, { status: 404 })
    return page
}

export const meta: Route.MetaFunction = ({ loaderData }) => (loaderData ? buildEventMeta(loaderData) : [])

export function HydrateFallback() {
    return <EventPageSkeleton />
}

export default function Event({ loaderData }: Route.ComponentProps) {
    return <EventPage data={loaderData} />
}
