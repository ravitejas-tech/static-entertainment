import { Text } from '~/components/ui/text'
import { sectionTitleId } from '~/data/layout/landmarks'
import { observeEntrance } from '~/lib/entrance'
import { cn } from '~/lib/utils'

export interface SectionHeadingProps {
    sectionId?: string
    level?: 'h1' | 'h2'
    eyebrow: string
    title: string
    lead?: string
    reveal?: boolean
    className?: string
}

export function SectionHeading({
    sectionId,
    level = 'h2',
    eyebrow,
    title,
    lead,
    reveal = true,
    className,
}: SectionHeadingProps) {
    return (
        <div
            ref={reveal ? observeEntrance : undefined}
            className={cn('mb-8 max-w-3xl space-y-3 md:mb-12', reveal && 'motion-safe:animate-reveal', className)}>
            <Text variant='meta'>{eyebrow}</Text>
            <Text
                as={level}
                id={sectionId && sectionTitleId(sectionId)}
                variant={level === 'h1' ? 'display' : 'heading'}>
                {title}
            </Text>
            {lead && (
                <Text
                    variant='lead'
                    tone='secondary'>
                    {lead}
                </Text>
            )}
        </div>
    )
}
