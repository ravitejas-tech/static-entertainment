import { Photo } from '~/components/ui/photo'
import { Text } from '~/components/ui/text'
import { AUDIENCE_PHOTOS } from '~/data/landing/images'
import { PHOTO_SIZES } from '~/data/ui/media'
import type { AudienceGroup } from '~/types/landing'

export function AudienceCard({ type, icon: Icon, title, body }: AudienceGroup) {
    return (
        <article className='group relative isolate flex aspect-4/5 flex-col justify-end overflow-hidden rounded-xl p-6'>
            <Photo
                photo={AUDIENCE_PHOTOS[type]}
                sizes={PHOTO_SIZES.tile}
                className='absolute inset-0 -z-20 transition-transform duration-500 ease-out motion-safe:group-hover:scale-105'
            />
            <div className='absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/55 to-ink/0' />
            <Icon
                className='mb-3 size-6 text-ivory/80'
                strokeWidth={1.75}
                aria-hidden
            />
            <Text
                as='h3'
                variant='title'
                tone='inverse'>
                {title}
            </Text>
            <Text
                variant='small'
                tone='inverse-muted'
                className='mt-2'>
                {body}
            </Text>
        </article>
    )
}
