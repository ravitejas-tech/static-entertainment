import { FileText, RotateCcw } from 'lucide-react'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import type { EventDetail } from '~/types/events'

export function PoliciesBlock({ terms, refundPolicy }: Pick<EventDetail, 'terms' | 'refundPolicy'>) {
    const policies = [
        { icon: FileText, title: EVENT_PAGE_COPY.blocks.terms, body: terms },
        { icon: RotateCcw, title: EVENT_PAGE_COPY.blocks.refunds, body: refundPolicy },
    ].filter(({ body }) => body)

    return (
        <div className='grid gap-5 sm:grid-cols-2 sm:gap-6'>
            {policies.map(({ icon: Icon, title, body }, index) => (
                <Reveal
                    key={title}
                    order={index}>
                    <section className='flex gap-3.5'>
                        <Icon
                            aria-hidden
                            className='mt-0.5 size-5 shrink-0 text-accent-text'
                        />
                        <div className='space-y-1.5'>
                            <Text
                                as='h2'
                                variant='strong'>
                                {title}
                            </Text>
                            <Text
                                variant='small'
                                tone='secondary'>
                                {body}
                            </Text>
                        </div>
                    </section>
                </Reveal>
            ))}
        </div>
    )
}
