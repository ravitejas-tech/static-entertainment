import { bookPath } from '~/data/navigation'
import { REGISTRATION_PAGE } from '~/data/registration/page'
import { NOINDEX } from '~/data/seo/site'
import { buildPageMeta } from '~/lib/seo/meta'

export function buildRegistrationMeta(slug: string, title: string | undefined) {
    return buildPageMeta({
        title: title ? REGISTRATION_PAGE.metaTitle(title) : REGISTRATION_PAGE.title,
        description: REGISTRATION_PAGE.metaDescription,
        path: bookPath(slug),
        robots: NOINDEX,
    })
}
