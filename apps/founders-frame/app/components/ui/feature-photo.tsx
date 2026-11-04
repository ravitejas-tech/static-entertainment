import { Photo } from '~/components/ui/photo'
import { PHOTO_SIZES } from '~/data/ui/media'
import { cn } from '~/lib/utils'
import type { ResponsivePhoto } from '~/types/media'

export interface FeaturePhotoProps {
    photo: ResponsivePhoto
    className?: string
}

export function FeaturePhoto({ photo, className }: FeaturePhotoProps) {
    return (
        <div className={cn('drop-shadow-photo', className)}>
            <div className='aspect-3/2 overflow-clip rounded-xl motion-safe:animate-clip-reveal'>
                <Photo
                    photo={photo}
                    sizes={PHOTO_SIZES.half}
                    className='motion-safe:animate-settle'
                />
            </div>
        </div>
    )
}
