import { Badge } from '~/components/ui/badge'
import { FeaturePhoto } from '~/components/ui/feature-photo'
import { Reveal } from '~/components/ui/reveal'
import { Text } from '~/components/ui/text'
import { FORMAT_AVAILABILITY } from '~/data/landing/formats'
import { cn } from '~/lib/utils'
import type { FormatFeature } from '~/types/landing'

export interface FormatFeatureRowProps {
    format: FormatFeature
    reversed: boolean
}

export function FormatFeatureRow({ format: { title, tone, photo, steps, body }, reversed }: FormatFeatureRowProps) {
    return (
        <article className='grid items-center gap-8 lg:grid-cols-12 lg:gap-16'>
            <FeaturePhoto
                photo={photo}
                className={cn('lg:col-span-7', reversed && 'lg:order-2')}
            />
            <Reveal className='space-y-5 lg:col-span-5'>
                <Badge tone={tone}>{FORMAT_AVAILABILITY.now}</Badge>
                <Text
                    as='h3'
                    variant='heading'>
                    {title}
                </Text>
                <Text
                    variant='lead'
                    tone='secondary'>
                    {body}
                </Text>
                <ol className='grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-5'>
                    {steps.map((step, index) => (
                        <li
                            key={step}
                            className='flex items-center gap-3'>
                            <Text
                                as='span'
                                variant='badge'
                                tone='accent'
                                className='grid size-7 shrink-0 place-items-center rounded-full border border-border bg-surface'>
                                {index + 1}
                            </Text>
                            <Text
                                as='span'
                                variant='label'>
                                {step}
                            </Text>
                        </li>
                    ))}
                </ol>
            </Reveal>
        </article>
    )
}
