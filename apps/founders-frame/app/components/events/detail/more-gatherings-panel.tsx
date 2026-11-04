import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Photo } from '~/components/ui/photo'
import { Text } from '~/components/ui/text'
import { HOME_EVENTS_PANELS } from '~/data/landing/events'
import { GATHERING_PHOTO } from '~/data/landing/images'
import { PATHS, PRIMARY_CTA_LABEL } from '~/data/navigation'
import { PHOTO_SIZES } from '~/data/ui/media'

export function MoreGatheringsPanel() {
    return (
        <div className='relative isolate flex h-full min-h-60 flex-col justify-end gap-2.5 overflow-clip rounded-xl bg-ink p-6 sm:p-8'>
            <Photo
                photo={{ ...GATHERING_PHOTO, alt: '' }}
                sizes={PHOTO_SIZES.card}
                className='absolute inset-0 -z-10 opacity-35'
            />
            <Text
                as='h3'
                variant='section'
                tone='inverse'>
                {HOME_EVENTS_PANELS.more.title}
            </Text>
            <Text tone='inverse-muted'>{HOME_EVENTS_PANELS.more.body}</Text>
            <Button
                asChild
                variant='gold'
                className='mt-2 hidden self-start sm:inline-flex'>
                <Link to={PATHS.events}>{PRIMARY_CTA_LABEL}</Link>
            </Button>
        </div>
    )
}
