import { AudienceCard } from '~/components/landing/audience-card'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { SwipeGrid } from '~/components/ui/swipe-grid'
import { AUDIENCE_GROUPS, AUDIENCE_HEADING } from '~/data/landing/audience'
import { SECTION_IDS } from '~/data/navigation'

export function AudienceSection() {
    return (
        <Section id={SECTION_IDS.audience}>
            <SectionHeading
                sectionId={SECTION_IDS.audience}
                {...AUDIENCE_HEADING}
            />
            <SwipeGrid>
                {AUDIENCE_GROUPS.map((group, index) => (
                    <Reveal
                        key={group.type}
                        order={index % 3}>
                        <AudienceCard {...group} />
                    </Reveal>
                ))}
            </SwipeGrid>
        </Section>
    )
}
