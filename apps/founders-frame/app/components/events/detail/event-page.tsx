import { Eye } from 'lucide-react'
import { AboutBlock } from '~/components/events/detail/about-block'
import { AgendaBlock } from '~/components/events/detail/agenda-block'
import { AudienceBlock } from '~/components/events/detail/audience-block'
import { EventHero } from '~/components/events/detail/event-hero'
import { FaqBlock } from '~/components/events/detail/faq-block'
import { GoodToKnow } from '~/components/events/detail/good-to-know'
import { MobileRegisterBar } from '~/components/events/detail/mobile-register-bar'
import { PoliciesBlock } from '~/components/events/detail/policies-block'
import { RelatedEvents } from '~/components/events/detail/related-events'
import { SpeakersBlock } from '~/components/events/detail/speakers-block'
import { TicketCard } from '~/components/events/detail/ticket-card'
import { Container } from '~/components/ui/container'
import { Notice } from '~/components/ui/notice'
import { Reveal } from '~/components/ui/reveal'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import type { EventPageData } from '~/types/events'

export function EventPage({ data: { event, related, preview } }: { data: EventPageData }) {
    return (
        <article className='pb-24 lg:pb-0'>
            {preview && (
                <Container className='py-4'>
                    <Notice
                        icon={Eye}
                        tone='warning'
                        {...EVENT_PAGE_COPY.preview}
                    />
                </Container>
            )}
            <EventHero event={event} />
            <Container className='grid gap-12 pb-16 md:pb-24 lg:grid-cols-12 lg:gap-12'>
                <div className='space-y-12 sm:space-y-16 lg:col-span-7 lg:pt-18 2xl:col-span-8'>
                    <AboutBlock {...event} />
                    {event.schedule.length > 0 && <AgendaBlock schedule={event.schedule} />}
                    {event.audience.length > 0 && <AudienceBlock {...event} />}
                    {event.hosts.length > 0 && <SpeakersBlock hosts={event.hosts} />}
                    {event.thingsToKnow.length > 0 && <GoodToKnow items={event.thingsToKnow} />}
                    {event.faqs.length > 0 && <FaqBlock faqs={event.faqs} />}
                    {(event.terms || event.refundPolicy) && <PoliciesBlock {...event} />}
                </div>
                <aside className='relative z-10 order-first -mt-10 lg:sticky lg:top-24 lg:order-none lg:col-span-5 lg:-mt-60 lg:self-start 2xl:col-span-4'>
                    <Reveal
                        trigger='load'
                        effect='lift'
                        order={2}>
                        <TicketCard event={event} />
                    </Reveal>
                </aside>
            </Container>
            {related.length > 0 && <RelatedEvents events={related} />}
            {event.open && <MobileRegisterBar event={event} />}
        </article>
    )
}
