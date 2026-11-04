import { Check } from 'lucide-react'
import { DetailBlock } from '~/components/events/detail/detail-block'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { paragraphs } from '~/lib/text'
import type { EventDetail } from '~/types/events'

export function AboutBlock({ description, highlights }: Pick<EventDetail, 'description' | 'highlights'>) {
    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.about}>
            {paragraphs(description).map((paragraph) => (
                <Text
                    key={paragraph}
                    tone='secondary'>
                    {paragraph}
                </Text>
            ))}
            {highlights.length > 0 && (
                <ul className='space-y-2 pt-2'>
                    {highlights.map((highlight) => (
                        <li
                            key={highlight}
                            className='flex items-start gap-3'>
                            <Check
                                className='mt-1 size-4 shrink-0 text-accent-text'
                                aria-hidden
                            />
                            <Text as='span'>{highlight}</Text>
                        </li>
                    ))}
                </ul>
            )}
        </DetailBlock>
    )
}
