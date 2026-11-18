import { HeroCollage } from '~/components/landing/hero-collage'
import { HeroCopy } from '~/components/landing/hero-copy'
import { Container } from '~/components/ui/container'
import type { EventSummary } from '~/types/events'

export function HeroSection({ featured }: { featured: EventSummary | undefined }) {
    return (
        <section className='relative isolate -mt-16 overflow-x-clip pt-16 sm:-mt-18 sm:pt-18'>
            <div
                className='absolute inset-y-0 right-0 -z-10 hidden w-1/3 rounded-bl-4xl bg-ink xl:block'
                aria-hidden
            />
            <Container className='grid gap-10 pb-14 md:pb-20 xl:grid-cols-12 xl:items-center xl:gap-x-12 xl:py-20 2xl:gap-x-16'>
                <HeroCopy className='xl:col-span-7' />
                <HeroCollage
                    featured={featured}
                    className='order-first xl:order-none xl:col-span-5'
                />
            </Container>
        </section>
    )
}
