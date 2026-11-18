import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Photo } from '~/components/ui/photo'
import { Reveal } from '~/components/ui/reveal'
import { RiseWords } from '~/components/ui/rise-words'
import { Text } from '~/components/ui/text'
import { sectionTitleId } from '~/data/layout/landmarks'
import { CLOSING_CTA } from '~/data/landing/cta'
import { CTA_PHOTO } from '~/data/landing/images'
import { PATHS, SECTION_IDS } from '~/data/navigation'
import { PHOTO_SIZES } from '~/data/ui/media'

export function ClosingCta() {
    return (
        <section
            id={SECTION_IDS.join}
            aria-labelledby={sectionTitleId(SECTION_IDS.join)}
            className='relative isolate scroll-mt-20 overflow-clip bg-ink'>
            <Photo
                photo={CTA_PHOTO}
                sizes={PHOTO_SIZES.full}
                className='absolute inset-0 -z-20 motion-safe:animate-settle'
            />
            <div className='absolute inset-0 -z-10 bg-ink/70' />
            <Container className='py-20 md:py-32'>
                <div className='mx-auto max-w-3xl space-y-5 text-center'>
                    <Text
                        variant='meta'
                        tone='inverse-muted'>
                        {CLOSING_CTA.eyebrow}
                    </Text>
                    <Text
                        as='h2'
                        id={sectionTitleId(SECTION_IDS.join)}
                        variant='display'
                        tone='inverse'>
                        <RiseWords text={CLOSING_CTA.title} />
                    </Text>
                    <Reveal
                        order={2}
                        className='space-y-5'>
                        <Text
                            variant='lead'
                            tone='inverse-muted'>
                            {CLOSING_CTA.body}
                        </Text>
                        <div className='grid gap-3 pt-2 sm:flex sm:justify-center'>
                            <Button asChild>
                                <Link to={PATHS.events}>{CLOSING_CTA.primary}</Link>
                            </Button>
                            <Button
                                asChild
                                variant='inverse'>
                                <Link to={PATHS.about}>{CLOSING_CTA.secondary}</Link>
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    )
}
