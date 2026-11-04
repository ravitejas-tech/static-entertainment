import { photoSrcSet } from '~/lib/media'
import { cn } from '~/lib/utils'
import type { ResponsivePhoto } from '~/types/media'

export interface PhotoProps {
    photo: ResponsivePhoto
    sizes: string
    priority?: boolean
    className?: string
}

export function Photo({ photo, sizes, priority = false, className }: PhotoProps) {
    return (
        <img
            src={photo.src}
            srcSet={photoSrcSet(photo)}
            sizes={sizes}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding='async'
            className={cn('size-full object-cover', className)}
        />
    )
}
