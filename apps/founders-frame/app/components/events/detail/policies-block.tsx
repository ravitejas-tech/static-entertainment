import { DetailBlock } from '~/components/events/detail/detail-block'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import type { EventDetail } from '~/types/events'

export function PoliciesBlock({ terms, refundPolicy }: Pick<EventDetail, 'terms' | 'refundPolicy'>) {
    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.policies}>
            {[terms, refundPolicy].filter(Boolean).map((policy) => (
                <Text
                    key={policy}
                    variant='small'
                    tone='secondary'>
                    {policy}
                </Text>
            ))}
        </DetailBlock>
    )
}
