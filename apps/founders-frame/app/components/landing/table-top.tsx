import { StackedPane } from '~/components/ui/stacked-pane'
import { Text } from '~/components/ui/text'
import { AUDIENCE_TABLE } from '~/data/landing/audience'
import type { AudienceGroup } from '~/types/landing'

export interface TableTopProps {
    groups: AudienceGroup[]
    chosen: number
}

export function TableTop({ groups, chosen }: TableTopProps) {
    return (
        <div className='absolute inset-1/4 grid place-items-center rounded-full border border-border bg-surface shadow-dialog'>
            <div
                aria-hidden
                className='absolute inset-2 rounded-full border border-dashed border-gold motion-safe:animate-orbit sm:inset-3.5'
            />
            <div className='grid w-4/5 sm:w-3/4'>
                {groups.map((group, index) => (
                    <StackedPane
                        key={group.type}
                        active={index === chosen}
                        className='flex flex-col items-center gap-1 text-center sm:gap-2.5'>
                        <Text
                            variant='meta'
                            className='text-tint-gold-text'>
                            <span className='sm:hidden'>{AUDIENCE_TABLE.seat(index + 1)}</span>
                            <span className='hidden sm:inline'>{AUDIENCE_TABLE.seatOf(index + 1, groups.length)}</span>
                        </Text>
                        <Text
                            as='h3'
                            variant='subtitle'
                            className='text-base/snug sm:hidden'>
                            {group.name}
                        </Text>
                        <Text
                            as='h3'
                            variant='title'
                            className='hidden sm:block xl:text-2xl/tight'>
                            {group.title}
                        </Text>
                        <Text
                            variant='small'
                            tone='secondary'
                            className='hidden sm:block'>
                            {group.body}
                        </Text>
                    </StackedPane>
                ))}
            </div>
        </div>
    )
}
