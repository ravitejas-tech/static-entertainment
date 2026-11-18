import { ArrowRight, CalendarDays, CalendarX2, Languages, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { RegistrationOption } from '~/components/events/detail/registration-option'
import { TicketNote } from '~/components/events/ticket-note'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { ExternalLink } from '~/components/ui/external-link'
import { IconText } from '~/components/ui/icon-text'
import { Notice } from '~/components/ui/notice'
import { Text } from '~/components/ui/text'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { DIRECTIONS_LABEL } from '~/data/events/media'
import { EVENT_PAGE_COPY, REGISTER_ANCHOR } from '~/data/events/page'
import { bookPath } from '~/data/navigation'
import { withCity } from '~/lib/events'
import { formatFullDate, formatRupees, formatTimeRange } from '~/lib/format'
import type { EventDetail } from '~/types/events'

const { registration } = EVENT_PAGE_COPY

export function TicketCard({ event }: { event: EventDetail }) {
    return (
        <Card
            id={REGISTER_ANCHOR}
            floating
            padding='lg'
            className='scroll-mt-24 space-y-5'>
            <div className='flex items-baseline justify-between gap-4'>
                <Text
                    as='h2'
                    variant='title'>
                    {registration.title}
                </Text>
                {event.fromPrice !== null && (
                    <Text
                        variant='small'
                        tone='muted'>
                        {registration.from}{' '}
                        <Text
                            as='strong'
                            variant='strong'>
                            {formatRupees(event.fromPrice)}
                        </Text>
                    </Text>
                )}
            </div>
            <div className='space-y-3 rounded-xl bg-bg p-4'>
                <IconText
                    icon={CalendarDays}
                    detail={formatTimeRange(event.startsAt, event.endsAt)}>
                    <time dateTime={event.startsAt}>{formatFullDate(event.startsAt)}</time>
                </IconText>
                <IconText
                    icon={MapPin}
                    detail={withCity(event.venueAddress, event.city)}
                    action={<ExternalLink href={event.directionsUrl}>{DIRECTIONS_LABEL}</ExternalLink>}>
                    {event.venueName || event.city}
                </IconText>
                {event.language && (
                    <div className='lg:hidden'>
                        <IconText icon={Languages}>{event.language}</IconText>
                    </div>
                )}
            </div>
            {event.ended ? (
                <Notice
                    icon={CalendarX2}
                    {...EVENT_PAGE_COPY.ended}
                />
            ) : event.options.length > 0 ? (
                <>
                    <ul className='divide-y divide-border'>
                        {event.options.map((option) => (
                            <RegistrationOption
                                key={option.id}
                                option={option}
                            />
                        ))}
                    </ul>
                    {event.open ? (
                        <Button
                            asChild
                            className='w-full'>
                            <Link to={bookPath(event.slug)}>
                                {EVENT_CARD_COPY.book}
                                <ArrowRight aria-hidden />
                            </Link>
                        </Button>
                    ) : (
                        <Button
                            disabled
                            className='w-full'>
                            {EVENT_CARD_COPY.closed}
                        </Button>
                    )}
                    <TicketNote />
                </>
            ) : (
                <Text tone='secondary'>{registration.noOptions}</Text>
            )}
        </Card>
    )
}
