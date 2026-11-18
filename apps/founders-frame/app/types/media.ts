import type { PHOTO_SHAPES } from '~/data/ui/media'

export type PhotoShape = keyof typeof PHOTO_SHAPES

export interface ResponsivePhoto {
    src: string
    alt: string
    width: number
    height: number
    widths: readonly number[]
}
