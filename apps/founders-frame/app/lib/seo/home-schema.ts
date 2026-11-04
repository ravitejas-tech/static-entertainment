import { BRAND_NAME, BRAND_TAGLINE } from '~/data/brand'
import { HOME_FAQS } from '~/data/landing/faq'
import { BRAND_ICONS, SITE } from '~/data/seo/site'
import { absoluteUrl } from '~/lib/seo/url'

export function homeSchema() {
    const organizationId = `${SITE.url}/#organization`
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': organizationId,
                name: BRAND_NAME,
                url: SITE.url,
                logo: absoluteUrl(BRAND_ICONS.large.path),
                description: BRAND_TAGLINE,
                areaServed: { '@type': 'City', name: 'Pune' },
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE.url}/#website`,
                url: SITE.url,
                name: BRAND_NAME,
                inLanguage: SITE.language,
                publisher: { '@id': organizationId },
            },
            {
                '@type': 'FAQPage',
                mainEntity: HOME_FAQS.map(({ question, answer }) => ({
                    '@type': 'Question',
                    name: question,
                    acceptedAnswer: { '@type': 'Answer', text: answer },
                })),
            },
        ],
    }
}
