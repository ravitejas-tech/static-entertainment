import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export function StepNumber({ children }: { children: ReactNode }) {
    return (
        <span className='grid size-8 shrink-0 place-items-center rounded-full bg-accent'>
            <Text
                as='span'
                variant='label'
                tone='on-accent'
                className='tabular-nums'>
                {children}
            </Text>
        </span>
    )
}
