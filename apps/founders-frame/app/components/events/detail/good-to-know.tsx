import { Info } from 'lucide-react'
import { DetailBlock } from '~/components/events/detail/detail-block'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'

export function GoodToKnow({ items }: { items: string[] }) {
    return (
        <DetailBlock
            title={EVENT_PAGE_COPY.blocks.goodToKnow}
            tone='muted'>
            <ul className='space-y-3'>
                {items.map((item) => (
                    <li
                        key={item}
                        className='flex items-start gap-3'>
                        <Info
                            className='mt-0.5 size-4.5 shrink-0 text-accent-text'
                            aria-hidden
                        />
                        <Text as='span'>{item}</Text>
                    </li>
                ))}
            </ul>
        </DetailBlock>
    )
}
