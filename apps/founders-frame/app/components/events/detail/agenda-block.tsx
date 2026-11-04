import { DetailBlock } from '~/components/events/detail/detail-block'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import type { EventScheduleItem } from '~/types/events'

export function AgendaBlock({ schedule }: { schedule: EventScheduleItem[] }) {
    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.agenda}>
            <ol className='space-y-0'>
                {schedule.map(({ time, title }) => (
                    <li
                        key={`${time}-${title}`}
                        className='grid grid-cols-4 gap-4 border-l-2 border-border py-3 pl-5 first:pt-0 last:pb-0 sm:grid-cols-6'>
                        <Text
                            variant='label'
                            tone='accent'
                            className='col-span-1 tabular-nums sm:col-span-1'>
                            {time}
                        </Text>
                        <Text className='col-span-3 sm:col-span-5'>{title}</Text>
                    </li>
                ))}
            </ol>
        </DetailBlock>
    )
}
