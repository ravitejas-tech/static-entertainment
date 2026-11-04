import { Mail } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { Notice } from '~/components/ui/notice'
import { Text } from '~/components/ui/text'
import { JOURNEY_PHONE, JOURNEY_QR } from '~/data/landing/formats'
import { cn } from '~/lib/utils'

const { ticket } = JOURNEY_PHONE

export function JourneyTicketScreen() {
    return (
        <>
            <div className='text-center'>
                <Text variant='title'>{ticket.title}</Text>
                <Text
                    variant='badge'
                    tone='secondary'>
                    {ticket.event}
                </Text>
            </div>
            <Card
                padding='sm'
                className='flex flex-col items-center gap-2 text-center'>
                <svg
                    viewBox={JOURNEY_QR.viewBox}
                    shapeRendering='crispEdges'
                    className='size-28 fill-current text-ink sm:size-32'>
                    <path d={JOURNEY_QR.path} />
                </svg>
                <Text variant='label'>{ticket.line}</Text>
                <Text
                    variant='badge'
                    tone='muted'>
                    {ticket.code}
                </Text>
            </Card>
            <div className='flex justify-center gap-1.5'>
                {Array.from({ length: ticket.count }, (_, index) => (
                    <span
                        key={index}
                        className={cn('h-1.5 rounded-full', index === 0 ? 'w-4 bg-accent' : 'w-1.5 bg-border')}
                    />
                ))}
            </div>
            <Notice
                tone='success'
                icon={Mail}
                title={ticket.sent}
                className='mt-auto'
            />
        </>
    )
}
