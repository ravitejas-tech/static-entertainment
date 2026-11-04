import { Eye } from 'lucide-react'
import { AboutBlock } from '~/components/events/detail/about-block'
import { AgendaBlock } from '~/components/events/detail/agenda-block'
import { AudienceBlock } from '~/components/events/detail/audience-block'
import { EventFacts } from '~/components/events/detail/event-facts'
import { EventHeader } from '~/components/events/detail/event-header'
import { FaqBlock } from '~/components/events/detail/faq-block'
import { GoodToKnow } from '~/components/events/detail/good-to-know'
import { MobileRegisterBar } from '~/components/events/detail/mobile-register-bar'
import { PoliciesBlock } from '~/components/events/detail/policies-block'
import { RegistrationPanel } from '~/components/events/detail/registration-panel'
import { RelatedEvents } from '~/components/events/detail/related-events'
import { SpeakersBlock } from '~/components/events/detail/speakers-block'
import { Container } from '~/components/ui/container'
import { Notice } from '~/components/ui/notice'
import { EVENT_PAGE_COPY } from '~/data/events/page'
import type { EventPageData } from '~/types/events'

export function EventPage({ data: { event, related, preview } }: { data: EventPageData }) {
    return (
        <article className='pb-24 lg:pb-0'>
            <Container className='space-y-12 py-10 md:py-14'>
                {preview && (
                    <Notice
                        icon={Eye}
                        tone='warning'
                        {...EVENT_PAGE_COPY.preview}
                    />
                )}
                <EventHeader event={event} />
                <div className='grid gap-10 lg:grid-cols-12 lg:gap-12'>
                    <div className='space-y-8 lg:col-span-7'>
                        <AboutBlock {...event} />
                        {event.audience.length > 0 && <AudienceBlock {...event} />}
                        {event.hosts.length > 0 && <SpeakersBlock hosts={event.hosts} />}
                        {event.schedule.length > 0 && <AgendaBlock schedule={event.schedule} />}
                        {event.thingsToKnow.length > 0 && <GoodToKnow items={event.thingsToKnow} />}
                        {event.faqs.length > 0 && <FaqBlock faqs={event.faqs} />}
                        {(event.terms || event.refundPolicy) && <PoliciesBlock {...event} />}
                    </div>
                    <aside className='order-first space-y-4 lg:sticky lg:top-24 lg:order-none lg:col-span-5 lg:self-start'>
                        <EventFacts event={event} />
                        <RegistrationPanel event={event} />
                    </aside>
                </div>
                {related.length > 0 && <RelatedEvents events={related} />}
            </Container>
            {event.open && <MobileRegisterBar event={event} />}
        </article>
    )
}
