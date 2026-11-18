import { DetailBlock } from '~/components/events/detail/detail-block'
import { Disclosure } from '~/components/ui/disclosure'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import type { EventFaq } from '~/types/events'

export function FaqBlock({ faqs }: { faqs: EventFaq[] }) {
    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.faqs}>
            <div>
                {faqs.map(({ question, answer }) => (
                    <Disclosure
                        key={question}
                        title={question}>
                        <Text tone='secondary'>{answer}</Text>
                    </Disclosure>
                ))}
            </div>
        </DetailBlock>
    )
}
