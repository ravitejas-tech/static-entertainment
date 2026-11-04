import { ShieldCheck } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { REGISTRATION_PAGE } from '~/data/registration/page'

const { review } = REGISTRATION_PAGE

export function ReviewProcess() {
    return (
        <Card
            tone='muted'
            className='space-y-4'>
            <div className='flex items-center gap-2 text-accent-text'>
                <ShieldCheck
                    className='size-5'
                    aria-hidden
                />
                <Text
                    as='h2'
                    variant='subtitle'>
                    {review.title}
                </Text>
            </div>
            <ol className='space-y-2'>
                {review.steps.map((step, index) => (
                    <li
                        key={step}
                        className='flex gap-3'>
                        <Text
                            as='span'
                            variant='label'
                            tone='accent'
                            className='tabular-nums'>
                            {index + 1}
                        </Text>
                        <Text
                            as='span'
                            variant='small'
                            tone='secondary'>
                            {step}
                        </Text>
                    </li>
                ))}
            </ol>
            <Text
                variant='small'
                tone='muted'>
                {review.note}
            </Text>
        </Card>
    )
}
