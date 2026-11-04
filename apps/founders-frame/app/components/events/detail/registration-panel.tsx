import { CalendarX2, ShieldCheck } from 'lucide-react'
import { RegistrationOption } from '~/components/events/detail/registration-option'
import { Card } from '~/components/ui/card'
import { Notice } from '~/components/ui/notice'
import { Text } from '~/components/ui/text'
import { EVENT_FORMATS } from '~/data/events/formats'
import { EVENT_PAGE_COPY, REGISTER_ANCHOR } from '~/data/events/page'
import type { EventDetail } from '~/types/events'

export function RegistrationPanel({ event }: { event: EventDetail }) {
    return (
        <Card
            id={REGISTER_ANCHOR}
            padding='lg'
            elevated
            className='scroll-mt-24 space-y-5'>
            <div className='space-y-2'>
                <Text
                    as='h2'
                    variant='title'>
                    {EVENT_PAGE_COPY.registration.title}
                </Text>
                <Text
                    variant='small'
                    tone='secondary'>
                    {EVENT_FORMATS[event.format].note}
                </Text>
            </div>
            {event.ended ? (
                <Notice
                    icon={CalendarX2}
                    {...EVENT_PAGE_COPY.ended}
                />
            ) : event.options.length > 0 ? (
                <ul className='space-y-4'>
                    {event.options.map((option) => (
                        <RegistrationOption
                            key={option.id}
                            slug={event.slug}
                            option={option}
                        />
                    ))}
                </ul>
            ) : (
                <Text tone='secondary'>{EVENT_PAGE_COPY.registration.noOptions}</Text>
            )}
            {event.format === 'application_based' && !event.ended && (
                <Notice
                    icon={ShieldCheck}
                    tone='info'
                    title={EVENT_PAGE_COPY.registration.reviewNote}
                />
            )}
        </Card>
    )
}
