import { Check } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { Text } from '~/components/ui/text'
import { ABOUT_INTRO } from '~/data/content/about'

export function AboutIntro() {
    return (
        <Section>
            <div className='grid gap-12 lg:grid-cols-12 lg:gap-16'>
                <div className='space-y-5 lg:col-span-7'>
                    <SectionHeading
                        level='h1'
                        eyebrow={ABOUT_INTRO.eyebrow}
                        title={ABOUT_INTRO.title}
                        className='mb-0 md:mb-0'
                    />
                    {ABOUT_INTRO.paragraphs.map((paragraph) => (
                        <Text
                            key={paragraph}
                            variant='lead'
                            tone='secondary'>
                            {paragraph}
                        </Text>
                    ))}
                </div>
                <div className='space-y-6 lg:col-span-5'>
                    <Text variant='title'>{ABOUT_INTRO.quote}</Text>
                    <Card className='space-y-4'>
                        <Text
                            as='h2'
                            variant='subtitle'>
                            {ABOUT_INTRO.lookingForTitle}
                        </Text>
                        <ul className='grid gap-2 sm:grid-cols-2'>
                            {ABOUT_INTRO.lookingFor.map((item) => (
                                <li
                                    key={item}
                                    className='flex items-center gap-2'>
                                    <Check
                                        className='size-4 shrink-0 text-accent-text'
                                        aria-hidden
                                    />
                                    <Text
                                        as='span'
                                        variant='small'
                                        tone='secondary'>
                                        {item}
                                    </Text>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </Section>
    )
}
