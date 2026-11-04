import { PATHS } from '~/data/navigation'

export const FOOTER_COPY = {
    blurb: 'A curated networking and business community for Pune’s founders, investors, business leaders and builders.',
    linksTitle: 'Explore',
    place: 'Founders Frame · Pune',
    platform: 'Part of Static Entertainment',
} as const

export const FOOTER_LINKS = [
    { label: 'Events', to: PATHS.events },
    { label: 'About', to: PATHS.about },
] as const
