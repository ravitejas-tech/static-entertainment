import { RegistrationScreen } from '~/components/registration/registration-screen'
import { RegistrationSkeleton } from '~/components/registration/registration-skeleton'
import { loadRegistrationRoute } from '~/lib/registration/route'
import { buildRegistrationMeta } from '~/lib/seo/registration-meta'
import type { Route } from './+types/$slug.rsvp'

export async function clientLoader({ params, request }: Route.ClientLoaderArgs) {
    return loadRegistrationRoute(params.slug, request)
}

export const meta: Route.MetaFunction = ({ loaderData, params }) =>
    buildRegistrationMeta('rsvp', params.slug, loaderData?.event?.title)

export function HydrateFallback() {
    return <RegistrationSkeleton />
}

export default function Rsvp({ loaderData, params }: Route.ComponentProps) {
    return (
        <RegistrationScreen
            mode='rsvp'
            slug={params.slug}
            {...loaderData}
        />
    )
}
