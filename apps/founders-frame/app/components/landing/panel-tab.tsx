import type { ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { Text } from '~/components/ui/text'

export interface PanelTabProps {
    marker: ReactNode
    title: string
}

export function PanelTab({ marker, title }: PanelTabProps) {
    const plus = (
        <span className='grid size-10 shrink-0 place-items-center rounded-full border border-ivory/50 text-ivory'>
            <Plus className='size-4' />
        </span>
    )

    return (
        <>
            <div className='hidden h-full flex-col items-center justify-between py-6 lg:flex'>
                {marker}
                <Text
                    as='span'
                    variant='subtitle'
                    tone='inverse'
                    className='max-h-80 rotate-180 truncate writing-vertical'>
                    {title}
                </Text>
                {plus}
            </div>
            <div className='flex h-full items-center gap-4 px-4 lg:hidden'>
                {marker}
                <Text
                    as='span'
                    variant='subtitle'
                    tone='inverse'
                    className='line-clamp-2 flex-1 text-base/snug'>
                    {title}
                </Text>
                {plus}
            </div>
        </>
    )
}
