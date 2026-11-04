import { FormatBadge } from '~/components/events/format-badge'
import { Text } from '~/components/ui/text'
import { EVENT_FORMATS } from '~/data/events/formats'
import { REGISTRATION_GUIDE } from '~/data/events/meta'

export function RegistrationGuide() {
    return (
        <section className='space-y-3'>
            <Text
                as='h2'
                variant='title'>
                {REGISTRATION_GUIDE.title}
            </Text>
            {REGISTRATION_GUIDE.formats.map((format) => (
                <div
                    key={format}
                    className='space-y-2 rounded-2xl border border-border bg-surface p-4'>
                    <FormatBadge format={format} />
                    <Text
                        variant='small'
                        tone='secondary'>
                        {EVENT_FORMATS[format].note}
                    </Text>
                </div>
            ))}
        </section>
    )
}
