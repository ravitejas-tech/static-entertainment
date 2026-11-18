import { DetailBlock } from '~/components/events/detail/detail-block'
import { Badge } from '~/components/ui/badge'
import { Photo } from '~/components/ui/photo'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { AUDIENCE_PHOTOS } from '~/data/landing/images'
import {
    FOUNDER_STAGE_LABELS,
    FOUNDER_STAGES,
    INDUSTRIES,
    INDUSTRY_LABELS,
    MEMBER_GROUP_LABELS,
} from '~/data/members/options'
import { PHOTO_SIZES } from '~/data/ui/media'
import { formatSentenceList } from '~/lib/format'
import { labelsOf } from '~/lib/options'
import type { EventDetail } from '~/types/events'

export function AudienceBlock({
    audience,
    industries,
    stages,
}: Pick<EventDetail, 'audience' | 'industries' | 'stages'>) {
    const focus = [
        {
            title: EVENT_PAGE_COPY.blocks.industries,
            tone: 'navy' as const,
            labels: labelsOf(industries, INDUSTRIES, INDUSTRY_LABELS),
        },
        {
            title: EVENT_PAGE_COPY.blocks.stages,
            tone: 'gold' as const,
            labels: labelsOf(stages, FOUNDER_STAGES, FOUNDER_STAGE_LABELS),
        },
    ].filter(({ labels }) => labels.length > 0)

    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.audience}>
            <ul className='hidden grid-cols-5 gap-4 sm:grid'>
                {audience.map((type, index) => (
                    <li key={type}>
                        <Reveal
                            effect='lift'
                            order={index}
                            className='flex flex-col items-center gap-3 text-center'>
                            <span className='size-22 overflow-clip rounded-full shadow-card ring-4 ring-surface'>
                                <Photo
                                    photo={{ ...AUDIENCE_PHOTOS[type], alt: '' }}
                                    sizes={PHOTO_SIZES.portrait}
                                />
                            </span>
                            <Text
                                as='span'
                                variant='label'>
                                {MEMBER_GROUP_LABELS[type]}
                            </Text>
                        </Reveal>
                    </li>
                ))}
            </ul>
            <div className='flex items-center gap-3.5 sm:hidden'>
                <span className='flex shrink-0 -space-x-3'>
                    {audience.map((type) => (
                        <span
                            key={type}
                            className='size-12 overflow-clip rounded-full ring-3 ring-bg'>
                            <Photo
                                photo={{ ...AUDIENCE_PHOTOS[type], alt: '' }}
                                sizes={PHOTO_SIZES.portrait}
                            />
                        </span>
                    ))}
                </span>
                <Text
                    variant='small'
                    tone='secondary'>
                    {formatSentenceList(audience.map((type) => MEMBER_GROUP_LABELS[type]))}
                </Text>
            </div>
            {focus.length > 0 && (
                <dl className='mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 sm:rounded-2xl sm:border sm:border-border sm:bg-surface sm:p-6'>
                    {focus.map(({ title, tone, labels }) => (
                        <div
                            key={title}
                            className='space-y-3'>
                            <Text
                                as='dt'
                                variant='meta'
                                tone='muted'>
                                {title}
                            </Text>
                            <dd className='flex flex-wrap gap-2'>
                                {labels.map((label) => (
                                    <Badge
                                        key={label}
                                        tone={tone}>
                                        {label}
                                    </Badge>
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>
            )}
        </DetailBlock>
    )
}
