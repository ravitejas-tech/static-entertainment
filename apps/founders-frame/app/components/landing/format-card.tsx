import { ChevronRight } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { FORMAT_AVAILABILITY } from '~/data/landing/formats'
import type { FormatStory } from '~/types/landing'

export function FormatCard({ title, steps, body }: FormatStory) {
    return (
        <Card className='flex h-full flex-col gap-4'>
            <Badge tone='outline'>{FORMAT_AVAILABILITY.later}</Badge>
            <div className='space-y-2'>
                <Text
                    as='h3'
                    variant='title'>
                    {title}
                </Text>
                <Text
                    variant='small'
                    tone='secondary'>
                    {body}
                </Text>
            </div>
            <ol className='mt-auto flex flex-wrap items-center gap-x-1.5 gap-y-1 border-t border-border pt-4'>
                {steps.map((step, index) => (
                    <li
                        key={step}
                        className='flex items-center gap-1.5'>
                        {index > 0 && (
                            <ChevronRight
                                className='size-4 text-text-muted'
                                aria-hidden
                            />
                        )}
                        <Text
                            as='span'
                            variant='label'>
                            {step}
                        </Text>
                    </li>
                ))}
            </ol>
        </Card>
    )
}
