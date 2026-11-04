import { ApplicationScreen } from '~/components/applications/application-screen'
import { QueryProvider } from '~/components/ui/query-provider'
import { APPLICATION_PAGE } from '~/data/applications/page'
import { applicationPath } from '~/data/navigation'
import { NOINDEX } from '~/data/seo/site'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/applications.$token'

export const meta: Route.MetaFunction = ({ params }) =>
    buildPageMeta({ ...APPLICATION_PAGE.meta, path: applicationPath(params.token), robots: NOINDEX })

export default function ApplicationPage({ params: { token } }: Route.ComponentProps) {
    return (
        <QueryProvider>
            <ApplicationScreen token={token} />
        </QueryProvider>
    )
}
