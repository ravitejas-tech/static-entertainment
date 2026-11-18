import { WEBSITE_PATHS } from '~/data/events/links'

export function eventPublicUrl(siteUrl: string, slug: string) {
    return `${siteUrl}${WEBSITE_PATHS.events}/${slug}`
}

export function eventPreviewUrl(siteUrl: string, { slug, preview_token }: { slug: string; preview_token: string }) {
    return `${eventPublicUrl(siteUrl, slug)}?${WEBSITE_PATHS.previewParam}=${preview_token}`
}

export function websiteAssetUrl(siteUrl: string | null, url: string) {
    return siteUrl && url.startsWith('/') ? `${siteUrl}${url}` : url
}
