import { eventPath } from '~/data/navigation'
import { REGISTRATION_PAGE } from '~/data/registration/page'
import { NOINDEX } from '~/data/seo/site'
import { buildPageMeta } from '~/lib/seo/meta'
import type { RegistrationMode } from '~/types/registration'

export function buildRegistrationMeta(mode: RegistrationMode, slug: string, title: string | undefined) {
    const copy = REGISTRATION_PAGE.modes[mode]
    return buildPageMeta({
        title: title ? copy.metaTitle(title) : copy.title,
        description: REGISTRATION_PAGE.metaDescription,
        path: `${eventPath(slug)}/${mode}`,
        robots: NOINDEX,
    })
}
