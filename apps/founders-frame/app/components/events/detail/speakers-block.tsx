import { DetailBlock } from '~/components/events/detail/detail-block'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { initials } from '~/lib/text'
import type { EventHost } from '~/types/events'

export function SpeakersBlock({ hosts }: { hosts: EventHost[] }) {
    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.speakers}>
            <ul className='grid gap-4 sm:grid-cols-2'>
                {hosts.map(({ name, role, part }) => (
                    <li
                        key={name}
                        className='flex items-start gap-3'>
                        <span className='grid size-12 shrink-0 place-items-center rounded-full bg-tint-navy text-tint-navy-text'>
                            <Text
                                as='span'
                                variant='label'
                                tone='inherit'>
                                {initials(name)}
                            </Text>
                        </span>
                        <div className='min-w-0 space-y-1'>
                            <Text variant='strong'>{name}</Text>
                            {role && (
                                <Text
                                    variant='small'
                                    tone='secondary'>
                                    {role}
                                </Text>
                            )}
                            <Badge tone='outline'>{EVENT_PAGE_COPY.hostParts[part]}</Badge>
                        </div>
                    </li>
                ))}
            </ul>
        </DetailBlock>
    )
}
