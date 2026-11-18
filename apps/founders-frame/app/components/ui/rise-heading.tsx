import { Reveal } from '~/components/ui/reveal'
import { RiseWords } from '~/components/ui/rise-words'
import { Text } from '~/components/ui/text'
import { sectionTitleId } from '~/data/layout/landmarks'
import { cn } from '~/lib/utils'

export interface RiseHeadingProps {
    sectionId?: string
    level?: 'h1' | 'h2'
    trigger?: 'scroll' | 'load'
    inverse?: boolean
    eyebrow: string
    title: string
    lead?: string
    className?: string
}

export function RiseHeading({
    sectionId,
    level = 'h2',
    trigger = 'scroll',
    inverse = false,
    eyebrow,
    title,
    lead,
    className,
}: RiseHeadingProps) {
    return (
        <div className={cn('mb-8 max-w-3xl space-y-3 md:mb-12', className)}>
            <Reveal trigger={trigger}>
                <Text
                    variant='meta'
                    className={cn(inverse && 'text-gold')}>
                    {eyebrow}
                </Text>
            </Reveal>
            <Text
                as={level}
                id={sectionId && sectionTitleId(sectionId)}
                variant={level === 'h1' ? 'display' : 'heading'}
                tone={inverse ? 'inverse' : 'primary'}>
                <RiseWords
                    text={title}
                    trigger={trigger}
                    startOrder={1}
                    underlineLast
                />
            </Text>
            {lead && (
                <Reveal
                    trigger={trigger}
                    order={4}>
                    <Text
                        variant='lead'
                        tone={inverse ? 'inverse-muted' : 'secondary'}>
                        {lead}
                    </Text>
                </Reveal>
            )}
        </div>
    )
}
