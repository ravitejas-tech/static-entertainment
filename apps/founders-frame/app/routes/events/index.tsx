import { EventBrowser } from '~/components/events/event-browser'
import { EventsIntro } from '~/components/events/events-intro'
import { Section } from '~/components/ui/section'
import { EVENTS_PAGE } from '~/data/events/meta'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/index'

async function loadDirectory() {
    const { loadEventSummaries } = await import('~/services/event-catalog')
    return { events: await loadEventSummaries() }
}

export async function loader() {
    return loadDirectory()
}

export async function clientLoader() {
    return loadDirectory()
}

export const meta: Route.MetaFunction = () => buildPageMeta(EVENTS_PAGE)

export default function Events({ loaderData: { events } }: Route.ComponentProps) {
    return (
        <Section>
            <EventsIntro />
            <EventBrowser events={events} />
        </Section>
    )
}
