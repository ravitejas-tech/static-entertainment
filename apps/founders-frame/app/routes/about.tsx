import { AboutIntro } from '~/components/content/about-intro'
import { BeliefsSection } from '~/components/content/beliefs-section'
import { ClosingCta } from '~/components/landing/closing-cta'
import { FormatsSection } from '~/components/landing/formats-section'
import { ABOUT_PAGE } from '~/data/content/about'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/about'

export const meta: Route.MetaFunction = () => buildPageMeta(ABOUT_PAGE)

export default function About() {
    return (
        <>
            <AboutIntro />
            <BeliefsSection />
            <FormatsSection />
            <ClosingCta />
        </>
    )
}
