import { RoundTable } from '~/components/landing/round-table'
import { Reveal } from '~/components/ui/reveal'
import { RiseHeading } from '~/components/ui/rise-heading'
import { Section } from '~/components/ui/section'
import { Text } from '~/components/ui/text'
import { AUDIENCE_GROUPS, AUDIENCE_HEADING, AUDIENCE_TABLE } from '~/data/landing/audience'
import { SECTION_IDS } from '~/data/navigation'

export function AudienceSection() {
    return (
        <Section
            id={SECTION_IDS.audience}
            surface='ink'>
            <div className='grid gap-10 xl:grid-cols-12 xl:items-center xl:gap-12'>
                <div className='flex flex-col gap-6 xl:col-span-5'>
                    <RiseHeading
                        sectionId={SECTION_IDS.audience}
                        inverse
                        className='mb-0 md:mb-0'
                        {...AUDIENCE_HEADING}
                    />
                    <Reveal order={5}>
                        <Text
                            variant='label'
                            tone='inverse-muted'
                            className='flex items-center gap-3'>
                            <span
                                aria-hidden
                                className='size-2.5 shrink-0 rounded-full bg-gold'
                            />
                            {AUDIENCE_TABLE.hint}
                        </Text>
                    </Reveal>
                </div>
                <RoundTable
                    groups={AUDIENCE_GROUPS}
                    className='xl:col-span-7'
                />
            </div>
        </Section>
    )
}
