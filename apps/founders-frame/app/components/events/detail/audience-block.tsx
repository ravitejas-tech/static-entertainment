import { DetailBlock } from '~/components/events/detail/detail-block'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import {
    FOUNDER_STAGE_LABELS,
    FOUNDER_STAGES,
    INDUSTRIES,
    INDUSTRY_LABELS,
    MEMBER_TYPE_LABELS,
    MEMBER_TYPE_TONES,
} from '~/data/members/options'
import { labelsOf } from '~/lib/options'
import type { EventDetail } from '~/types/events'

export function AudienceBlock({
    audience,
    industries,
    stages,
}: Pick<EventDetail, 'audience' | 'industries' | 'stages'>) {
    const focus = [
        { title: EVENT_PAGE_COPY.blocks.industries, labels: labelsOf(industries, INDUSTRIES, INDUSTRY_LABELS) },
        { title: EVENT_PAGE_COPY.blocks.stages, labels: labelsOf(stages, FOUNDER_STAGES, FOUNDER_STAGE_LABELS) },
    ].filter(({ labels }) => labels.length > 0)

    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.audience}>
            <div className='flex flex-wrap gap-2'>
                {audience.map((type) => (
                    <Badge
                        key={type}
                        tone={MEMBER_TYPE_TONES[type]}>
                        {MEMBER_TYPE_LABELS[type]}
                    </Badge>
                ))}
            </div>
            {focus.map(({ title, labels }) => (
                <div
                    key={title}
                    className='space-y-2'>
                    <Text
                        as='h3'
                        variant='label'
                        tone='secondary'>
                        {title}
                    </Text>
                    <div className='flex flex-wrap gap-2'>
                        {labels.map((label) => (
                            <Badge
                                key={label}
                                tone='outline'>
                                {label}
                            </Badge>
                        ))}
                    </div>
                </div>
            ))}
        </DetailBlock>
    )
}
