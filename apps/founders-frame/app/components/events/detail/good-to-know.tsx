import { Info } from 'lucide-react'
import { DetailBlock } from '~/components/events/detail/detail-block'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'

export function GoodToKnow({ items }: { items: string[] }) {
    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.goodToKnow}>
            <ul className='space-y-2'>
                {items.map((item) => (
                    <li
                        key={item}
                        className='flex items-start gap-3'>
                        <Info
                            className='mt-1 size-4 shrink-0 text-text-muted'
                            aria-hidden
                        />
                        <Text
                            as='span'
                            tone='secondary'>
                            {item}
                        </Text>
                    </li>
                ))}
            </ul>
        </DetailBlock>
    )
}
