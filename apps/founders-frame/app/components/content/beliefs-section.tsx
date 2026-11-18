import { Card } from '~/components/ui/card'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { Text } from '~/components/ui/text'
import { BELIEFS, BELIEFS_HEADING, BELIEFS_SECTION_ID } from '~/data/content/about'

export function BeliefsSection() {
    return (
        <Section
            id={BELIEFS_SECTION_ID}
            surface='muted'>
            <SectionHeading
                sectionId={BELIEFS_SECTION_ID}
                {...BELIEFS_HEADING}
            />
            <ol className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {BELIEFS.map(({ title, body }, index) => (
                    <Reveal
                        key={title}
                        order={index}
                        role='listitem'>
                        <Card className='h-full space-y-3'>
                            <Text
                                variant='stat'
                                tone='accent'>
                                {String(index + 1).padStart(2, '0')}
                            </Text>
                            <Text
                                as='h3'
                                variant='subtitle'>
                                {title}
                            </Text>
                            <Text
                                variant='small'
                                tone='secondary'>
                                {body}
                            </Text>
                        </Card>
                    </Reveal>
                ))}
            </ol>
        </Section>
    )
}
