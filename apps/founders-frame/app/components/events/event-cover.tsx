import { cva, type VariantProps } from 'class-variance-authority'
import { BrandEmblem } from '~/components/ui/brand-emblem'
import { PHOTO_SIZES } from '~/data/ui/media'
import { cn } from '~/lib/utils'
import type { EventCover as Cover } from '~/types/events'

const coverVariants = cva('relative aspect-video w-full overflow-clip bg-surface-muted', {
    variants: {
        shape: {
            card: 'rounded-t-xl',
            framed: 'rounded-lg',
        },
    },
    defaultVariants: { shape: 'framed' },
})

export interface EventCoverProps extends VariantProps<typeof coverVariants> {
    cover: Cover | null
    priority?: boolean
    sizes?: string
    className?: string
}

export function EventCover({ cover, shape, priority = false, sizes = PHOTO_SIZES.card, className }: EventCoverProps) {
    return (
        <div className={cn(coverVariants({ shape }), className)}>
            {cover ? (
                <img
                    src={cover.src}
                    srcSet={cover.srcSet}
                    sizes={cover.srcSet && sizes}
                    alt={cover.alt}
                    width={960}
                    height={540}
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    className='size-full object-cover'
                />
            ) : (
                <div className='grid size-full place-items-center'>
                    <BrandEmblem className='h-14 opacity-70' />
                </div>
            )}
        </div>
    )
}
