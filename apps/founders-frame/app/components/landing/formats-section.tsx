import { FormatCard } from '~/components/landing/format-card'
import { FormatFeatureRow } from '~/components/landing/format-feature-row'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { FORMAT_FEATURES, FORMATS_HEADING, FORMATS_LATER } from '~/data/landing/formats'
import { SECTION_IDS } from '~/data/navigation'

export function FormatsSection() {
    return (
        <Section
            id={SECTION_IDS.formats}
            surface='muted'>
            <SectionHeading
                sectionId={SECTION_IDS.formats}
                {...FORMATS_HEADING}
            />
            <div className='space-y-14 lg:space-y-24'>
                {FORMAT_FEATURES.map((format, index) => (
                    <FormatFeatureRow
                        key={format.title}
                        format={format}
                        reversed={index % 2 === 1}
                    />
                ))}
                <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
                    {FORMATS_LATER.map((story, index) => (
                        <Reveal
                            key={story.title}
                            order={index}>
                            <FormatCard {...story} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </Section>
    )
}
