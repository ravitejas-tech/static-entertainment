import { Disclosure } from '~/components/ui/disclosure'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { Text } from '~/components/ui/text'
import { FAQ_HEADING, HOME_FAQS } from '~/data/landing/faq'
import { SECTION_IDS } from '~/data/navigation'

export function FaqSection() {
    return (
        <Section id={SECTION_IDS.questions}>
            <div className='grid gap-4 lg:grid-cols-12 lg:gap-16'>
                <SectionHeading
                    sectionId={SECTION_IDS.questions}
                    className='lg:col-span-4'
                    {...FAQ_HEADING}
                />
                <Reveal className='lg:col-span-8'>
                    {HOME_FAQS.map(({ question, answer }) => (
                        <Disclosure
                            key={question}
                            title={question}>
                            <Text tone='secondary'>{answer}</Text>
                        </Disclosure>
                    ))}
                </Reveal>
            </div>
        </Section>
    )
}
