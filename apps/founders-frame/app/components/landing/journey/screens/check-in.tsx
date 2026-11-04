import { Check } from 'lucide-react'
import { Photo } from '~/components/ui/photo'
import { Text } from '~/components/ui/text'
import { JOURNEY_PHONE } from '~/data/landing/formats'
import { JOURNEY_PHOTOS } from '~/data/landing/images'
import { PHOTO_SIZES } from '~/data/ui/media'

const { checkIn } = JOURNEY_PHONE

export function JourneyCheckInScreen() {
    return (
        <>
            <div className='flex flex-col items-center gap-2 rounded-xl bg-tint-green px-4 py-6 text-center'>
                <span className='grid size-14 place-items-center rounded-full bg-success text-ivory'>
                    <Check
                        aria-hidden
                        strokeWidth={3}
                        className='size-7'
                    />
                </span>
                <Text
                    variant='title'
                    tone='success'>
                    {checkIn.title}
                </Text>
                <Text
                    variant='badge'
                    tone='success'>
                    {checkIn.line}
                </Text>
            </div>
            <div className='relative isolate flex flex-1 items-end overflow-clip rounded-xl p-3.5'>
                <Photo
                    photo={{ ...JOURNEY_PHOTOS.room, alt: '' }}
                    sizes={PHOTO_SIZES.phone}
                    className='absolute inset-0 -z-20'
                />
                <div className='absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/30 to-ink/0' />
                <Text
                    variant='subtitle'
                    tone='inverse'>
                    {checkIn.welcome}
                </Text>
            </div>
        </>
    )
}
