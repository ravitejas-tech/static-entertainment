import type { MetaDescriptor } from 'react-router'
import { BRAND_NAME } from '~/data/brand'
import { eventMetaTitle } from '~/data/events/meta'
import { eventPath } from '~/data/navigation'
import { NOINDEX, SITE } from '~/data/seo/site'
import { isOpen } from '~/lib/events'
import { buildPageMeta } from '~/lib/seo/meta'
import { absoluteUrl } from '~/lib/seo/url'
import type { EventPageData } from '~/types/events'

function eventSchema({ event }: EventPageData) {
    const url = absoluteUrl(eventPath(event.slug))
    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.title,
        description: event.summary || event.description,
        url,
        startDate: event.startsAt,
        endDate: event.endsAt,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
            '@type': 'Place',
            name: event.venueName || event.city,
            address: {
                '@type': 'PostalAddress',
                streetAddress: event.venueAddress,
                addressLocality: event.city,
                addressCountry: SITE.country,
            },
        },
        organizer: { '@type': 'Organization', name: BRAND_NAME, url: SITE.url },
        ...(event.cover && { image: [absoluteUrl(event.cover.src)] }),
        offers: event.options.map((option) => ({
            '@type': 'Offer',
            name: option.name,
            price: option.price,
            priceCurrency: 'INR',
            url,
            availability: isOpen(option.status) ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
        })),
    }
}

export function buildEventMeta(data: EventPageData): MetaDescriptor[] {
    const { event, preview } = data
    return [
        ...buildPageMeta({
            title: eventMetaTitle(event.title),
            description: event.summary || event.description.slice(0, 155),
            path: eventPath(event.slug),
            ...(event.cover && { image: { path: event.cover.src, alt: event.cover.alt } }),
            ...(preview && { robots: NOINDEX }),
        }),
        { 'script:ld+json': eventSchema(data) },
    ]
}
