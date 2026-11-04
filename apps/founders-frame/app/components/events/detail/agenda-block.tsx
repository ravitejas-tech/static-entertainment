import { DetailBlock } from '~/components/events/detail/detail-block'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import type { EventScheduleItem } from '~/types/events'

export function AgendaBlock({ schedule }: { schedule: EventScheduleItem[] }) {
    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.agenda}>
            <ol className='relative space-y-5 sm:space-y-7'>
                <span
                    aria-hidden
                    className='absolute top-3 bottom-3 left-1.5 w-0.5 bg-border sm:left-29.5'
                />
                {schedule.map(({ time, title }, index) => (
                    <li key={`${time}-${title}`}>
                        <Reveal
                            effect='lift'
                            order={index}
                            className='relative flex gap-4 sm:items-center'>
                            <span className='mt-1 size-3.5 shrink-0 rounded-full bg-gold ring-5 ring-bg sm:order-2 sm:mt-0' />
                            <div className='flex flex-col gap-0.5 sm:contents'>
                                <Text
                                    as='span'
                                    variant='subtitle'
                                    tone='accent'
                                    className='tabular-nums sm:order-1 sm:w-24 sm:shrink-0'>
                                    {time}
                                </Text>
                                <Text
                                    as='span'
                                    variant='reading'
                                    className='sm:order-3'>
                                    {title}
                                </Text>
                            </div>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </DetailBlock>
    )
}
