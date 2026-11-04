export const LANDING_PHOTO_DIR = '/images/landing'

export const PHOTO_SHAPES = {
    wide: { width: 1536, height: 1024, widths: [768, 1152] },
    tall: { width: 800, height: 1000, widths: [400, 600] },
    portrait: { width: 1024, height: 1536, widths: [480, 720] },
} as const

export const PHOTO_SIZES = {
    full: '100vw',
    half: '(min-width: 1024px) 55vw, 100vw',
    tile: '(min-width: 1024px) 30rem, (min-width: 640px) 45vw, 85vw',
    collage: '(min-width: 1280px) 18rem, (min-width: 768px) 32vw, 75vw',
    card: '(min-width: 1024px) 30rem, (min-width: 640px) 50vw, 85vw',
    cover: '(min-width: 1024px) 56rem, 100vw',
    agenda: '(min-width: 1024px) 18rem, 13rem',
    thumb: '6rem',
} as const
