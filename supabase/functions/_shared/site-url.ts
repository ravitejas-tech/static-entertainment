export interface CommunitySite {
    slug: string
    site_url: string | null
}

export function requireSiteUrl({ slug, site_url }: CommunitySite) {
    if (!site_url) throw new Error(`No site URL is set for the ${slug} community`)
    return site_url
}
