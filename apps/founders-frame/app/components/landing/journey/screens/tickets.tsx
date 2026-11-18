import { JourneyTicketLine } from '~/components/landing/journey/screens/ticket-line'
import { Button } from '~/components/ui/button'
import { Photo } from '~/components/ui/photo'
import { Text } from '~/components/ui/text'
import { JOURNEY_PHONE } from '~/data/landing/formats'
import { JOURNEY_PHOTOS } from '~/data/landing/images'
import { PHOTO_SIZES } from '~/data/ui/media'

const { tickets, pay } = JOURNEY_PHONE

export function JourneyTicketsScreen() {
    return (
        <>
            <div className='h-24 overflow-clip rounded-xl sm:h-28'>
                <Photo
                    photo={{ ...JOURNEY_PHOTOS.event, alt: '' }}
                    sizes={PHOTO_SIZES.phone}
                />
            </div>
            <div>
                <Text variant='subtitle'>{tickets.event}</Text>
                <Text
                    variant='badge'
                    tone='muted'>
                    {tickets.when}
                </Text>
            </div>
            <Text
                variant='meta'
                tone='muted'>
                {tickets.label}
            </Text>
            <ul className='space-y-2'>
                {tickets.lines.map((line) => (
                    <JourneyTicketLine
                        key={line.name}
                        {...line}
                    />
                ))}
            </ul>
            <Button
                asChild
                size='sm'
                className='mt-auto w-full'>
                <span>{pay}</span>
            </Button>
        </>
    )
}
