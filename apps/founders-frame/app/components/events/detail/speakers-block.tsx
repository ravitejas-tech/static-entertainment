import { DetailBlock } from '~/components/events/detail/detail-block'
import { Badge } from '~/components/ui/badge'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import { initials } from '~/lib/text'
import type { EventHost } from '~/types/events'

export function SpeakersBlock({ hosts }: { hosts: EventHost[] }) {
    return (
        <DetailBlock title={EVENT_PAGE_COPY.blocks.speakers}>
            <ul className='grid gap-4 sm:grid-cols-2'>
                {hosts.map(({ name, role, part }, index) => (
                    <li key={name}>
                        <Reveal
                            effect='lift'
                            order={index}
                            className='flex h-full items-center gap-4 sm:rounded-2xl sm:border sm:border-border sm:bg-surface sm:p-5'>
                            <span className='grid size-12 shrink-0 place-items-center rounded-full bg-accent sm:size-14'>
                                <Text
                                    as='span'
                                    variant='label'
                                    tone='on-accent'>
                                    {initials(name)}
                                </Text>
                            </span>
                            <div className='min-w-0 space-y-1'>
                                <Text variant='strong'>
                                    {name}
                                    <Text
                                        as='span'
                                        variant='inherit'
                                        tone='muted'
                                        className='sm:hidden'>
                                        {` · ${EVENT_PAGE_COPY.hostParts[part]}`}
                                    </Text>
                                </Text>
                                {role && (
                                    <Text
                                        variant='small'
                                        tone='secondary'>
                                        {role}
                                    </Text>
                                )}
                                <Badge
                                    tone='outline'
                                    className='mt-1 hidden sm:inline-flex'>
                                    {EVENT_PAGE_COPY.hostParts[part]}
                                </Badge>
                            </div>
                        </Reveal>
                    </li>
                ))}
            </ul>
        </DetailBlock>
    )
}
