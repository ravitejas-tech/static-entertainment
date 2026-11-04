import { Reveal } from '~/components/ui/reveal'
import { RiseWords } from '~/components/ui/rise-words'
import { Text } from '~/components/ui/text'
import { EVENTS_HEADING } from '~/data/events/meta'

export function EventsIntro() {
    return (
        <div className='mb-8 max-w-3xl space-y-3 md:mb-12'>
            <Reveal trigger='load'>
                <Text variant='meta'>{EVENTS_HEADING.eyebrow}</Text>
            </Reveal>
            <Text
                as='h1'
                variant='display'>
                <RiseWords
                    text={EVENTS_HEADING.title}
                    trigger='load'
                    startOrder={1}
                    underlineLast
                />
            </Text>
            <Reveal
                trigger='load'
                order={4}>
                <Text
                    variant='lead'
                    tone='secondary'>
                    {EVENTS_HEADING.lead}
                </Text>
            </Reveal>
        </div>
    )
}
