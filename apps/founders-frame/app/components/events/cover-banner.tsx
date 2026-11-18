import type { ReactNode } from 'react'
import type { EventCover } from '~/types/events'

export interface CoverBannerProps {
    photo: EventCover
    children: ReactNode
}

export function CoverBanner({ photo, children }: CoverBannerProps) {
    return (
        <section className='relative isolate overflow-clip bg-ink'>
            <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes={photo.srcSet && '100vw'}
                alt={photo.alt}
                width={1536}
                height={1024}
                loading='eager'
                fetchPriority='high'
                className='absolute inset-0 -z-20 size-full object-cover motion-safe:animate-settle'
            />
            <div className='absolute inset-0 -z-10 bg-linear-to-t from-ink/95 via-ink/65 to-ink/20 lg:from-ink/60 lg:via-ink/0 lg:to-ink/0' />
            <div className='absolute inset-0 -z-10 hidden bg-linear-to-r from-ink/95 via-ink/70 to-ink/15 lg:block' />
            {children}
        </section>
    )
}
