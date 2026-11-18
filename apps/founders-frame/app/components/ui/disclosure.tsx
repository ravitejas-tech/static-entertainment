import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { Text } from '~/components/ui/text'

export interface DisclosureProps {
    title: string
    children: ReactNode
}

export function Disclosure({ title, children }: DisclosureProps) {
    return (
        <details className='group border-b border-border py-4 first:pt-0 last:border-b-0'>
            <summary className='flex cursor-pointer list-none items-center justify-between gap-4 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden'>
                <Text
                    as='span'
                    variant='subtitle'>
                    {title}
                </Text>
                <ChevronDown
                    className='size-5 shrink-0 text-text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none'
                    aria-hidden
                />
            </summary>
            <div className='pt-3'>{children}</div>
        </details>
    )
}
