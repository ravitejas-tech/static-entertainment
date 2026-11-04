import { LANDING_PHOTO_DIR, PHOTO_SHAPES } from '~/data/ui/media'
import type { PhotoShape, ResponsivePhoto } from '~/types/media'

export const photoVariant = (src: string, width: number) => src.replace(/(\.\w+)$/, `-${width}$1`)

export const photoSrcSet = ({ src, width, widths }: ResponsivePhoto) =>
    [...widths.map((size) => `${photoVariant(src, size)} ${size}w`), `${src} ${width}w`].join(', ')

export const landingPhoto = (name: string, shape: PhotoShape, alt: string): ResponsivePhoto => ({
    src: `${LANDING_PHOTO_DIR}/${name}.webp`,
    alt,
    ...PHOTO_SHAPES[shape],
})
