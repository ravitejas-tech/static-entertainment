import { EventBrowser } from '~/components/events/event-browser'
import { RiseHeading } from '~/components/ui/rise-heading'
import { Section } from '~/components/ui/section'
import { EVENTS_HEADING, EVENTS_PAGE } from '~/data/events/meta'
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
            <RiseHeading
                level='h1'
                trigger='load'
                {...EVENTS_HEADING}
            />
            <EventBrowser events={events} />
        </Section>
    )
}
