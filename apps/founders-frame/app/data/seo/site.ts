export const SITE = {
    url: import.meta.env.VITE_SITE_URL || 'http://localhost:7302',
    shortName: 'Founders Frame',
    locale: 'en_IN',
    language: 'en-IN',
    country: 'IN',
} as const

export const ROBOTS_DIRECTIVES = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const NOINDEX = 'noindex, nofollow'

export const SOCIAL_IMAGE = {
    path: '/og/founders-frame.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: 'Founders Frame — the right people change everything. A curated community for Pune’s founders, investors and builders.',
} as const

export const BRAND_ICONS = {
    favicon: { path: '/icons/favicon-32.png', size: 32 },
    appleTouch: '/icons/apple-touch-icon.png',
    small: { path: '/icons/icon-192.png', size: 192 },
    large: { path: '/icons/icon-512.png', size: 512 },
    maskable: { path: '/icons/icon-maskable-512.png', size: 512 },
} as const

export const THEME_COLOR = '#f7f6f2'
