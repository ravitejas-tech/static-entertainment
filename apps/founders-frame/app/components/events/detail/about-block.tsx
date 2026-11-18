import { Check } from 'lucide-react'
import { DetailBlock } from '~/components/events/detail/detail-block'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { paragraphs } from '~/lib/text'
import type { EventDetail } from '~/types/events'

export function AboutBlock({ description, highlights }: Pick<EventDetail, 'description' | 'highlights'>) {
    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.about}>
            <div className='space-y-4'>
                {paragraphs(description).map((paragraph) => (
                    <Text
                        key={paragraph}
                        variant='reading'
                        tone='secondary'>
                        {paragraph}
                    </Text>
                ))}
            </div>
            {highlights.length > 0 && (
                <div className='space-y-4 pt-6 sm:pt-8'>
                    <Text variant='meta'>{EVENT_PAGE_COPY.blocks.highlights}</Text>
                    <ul className='grid gap-3 sm:grid-cols-3 sm:gap-4'>
                        {highlights.map((highlight, index) => (
                            <li key={highlight}>
                                <Reveal
                                    effect='lift'
                                    order={index}
                                    className='flex h-full items-center gap-3 sm:flex-col sm:items-start sm:gap-3.5 sm:rounded-2xl sm:border sm:border-border sm:bg-surface sm:p-5'>
                                    <span className='grid size-6.5 shrink-0 place-items-center rounded-full bg-tint-gold text-tint-gold-text sm:size-8'>
                                        <Check
                                            aria-hidden
                                            strokeWidth={2.25}
                                            className='size-3.5 sm:size-4'
                                        />
                                    </span>
                                    <Text
                                        as='span'
                                        variant='label'>
                                        {highlight}
                                    </Text>
                                </Reveal>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </DetailBlock>
    )
}
