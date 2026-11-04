import { AudienceSection } from '~/components/landing/audience-section'
import { ClosingCta } from '~/components/landing/closing-cta'
import { EventsSection } from '~/components/landing/events-section'
import { FormatsSection } from '~/components/landing/formats-section'
import { HeroSection } from '~/components/landing/hero-section'
import { HOME_EVENTS_LIMIT } from '~/data/landing/events'
import { LANDING_PAGE } from '~/data/landing/meta'
import { homeSchema } from '~/lib/seo/home-schema'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/index'

async function loadHome() {
    const { loadUpcomingEvents } = await import('~/services/event-catalog')
    return { events: await loadUpcomingEvents() }
}

export async function loader() {
    return loadHome()
}

export async function clientLoader() {
    return loadHome()
}

export const meta: Route.MetaFunction = () => [...buildPageMeta(LANDING_PAGE), { 'script:ld+json': homeSchema() }]

export default function Home({ loaderData: { events } }: Route.ComponentProps) {
    return (
        <>
            <HeroSection featured={events[0]} />
            <EventsSection events={events.slice(0, HOME_EVENTS_LIMIT)} />
            <AudienceSection />
            <FormatsSection />
            <ClosingCta />
        </>
    )
}
