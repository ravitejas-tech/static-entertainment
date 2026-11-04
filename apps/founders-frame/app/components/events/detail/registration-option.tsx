import { Link } from 'react-router'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { EVENT_FORMATS } from '~/data/events/formats'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { SEAT_STATUS_LABELS } from '~/data/events/status'
import { isOpen, registrationPath } from '~/lib/events'
import { formatEventDay, formatRupees } from '~/lib/format'
import type { RegistrationOption as Option } from '~/types/events'

export interface RegistrationOptionProps {
    slug: string
    option: Option
}

export function RegistrationOption({ slug, option }: RegistrationOptionProps) {
    const { name, description, price, requiresApproval, status, opensAt } = option
    const paid = price > 0
    const format = requiresApproval ? 'application_based' : paid ? 'paid' : 'free_rsvp'
    const statusLabel =
        status === 'opens-later' && opensAt
            ? EVENT_PAGE_COPY.registration.opens(formatEventDay(opensAt))
            : SEAT_STATUS_LABELS[status]

    return (
        <li className='space-y-3 border-t border-border pt-4 first:border-t-0 first:pt-0'>
            <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0 space-y-1'>
                    <Text variant='strong'>{name}</Text>
                    {description && (
                        <Text
                            variant='small'
                            tone='secondary'>
                            {description}
                        </Text>
                    )}
                </div>
                <Text
                    variant='label'
                    className='shrink-0'>
                    {paid ? formatRupees(price) : EVENT_PAGE_COPY.registration.free}
                </Text>
            </div>
            {status !== 'open' && <Badge tone={status === 'few-left' ? 'sand' : 'outline'}>{statusLabel}</Badge>}
            {isOpen(status) && !paid ? (
                <Button
                    asChild
                    className='w-full'>
                    <Link to={registrationPath(slug, option)}>{EVENT_FORMATS[format].cta}</Link>
                </Button>
            ) : (
                <Button
                    disabled
                    className='w-full'>
                    {EVENT_FORMATS[format].cta}
                </Button>
            )}
        </li>
    )
}
