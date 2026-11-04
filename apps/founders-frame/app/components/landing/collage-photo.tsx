import { Photo } from '~/components/ui/photo'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { PHOTO_SIZES } from '~/data/ui/media'
import { cn } from '~/lib/utils'
import type { ResponsivePhoto } from '~/types/media'

export interface CollagePhotoProps {
    photo: ResponsivePhoto
    order: number
    priority?: boolean
    caption?: readonly string[]
    className?: string
}

export function CollagePhoto({ photo, order, priority = false, caption, className }: CollagePhotoProps) {
    return (
        <Reveal
            trigger='load'
            order={order}
            className={cn('relative isolate overflow-clip rounded-2xl bg-surface-muted shadow-dialog', className)}>
            <Photo
                photo={photo}
                sizes={PHOTO_SIZES.collage}
                priority={priority}
                className='absolute inset-0 -z-20'
            />
            {caption && (
                <>
                    <div className='absolute inset-0 -z-10 bg-linear-to-t from-ink/80 via-ink/20 to-ink/0' />
                    <div className='flex h-full flex-col items-end justify-end p-4 text-right'>
                        {caption.map((line) => (
                            <Text
                                key={line}
                                variant='subtitle'
                                tone='inverse'>
                                {line}
                            </Text>
                        ))}
                    </div>
                </>
            )}
        </Reveal>
    )
}
