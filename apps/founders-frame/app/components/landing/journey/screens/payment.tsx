import { Lock } from 'lucide-react'
import { JourneyPayMethodRow } from '~/components/landing/journey/screens/pay-method'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { JOURNEY_PHONE } from '~/data/landing/formats'

const { payment, pay } = JOURNEY_PHONE

export function JourneyPaymentScreen() {
    return (
        <>
            <Card
                padding='sm'
                className='space-y-1.5'>
                <Text
                    variant='meta'
                    tone='muted'>
                    {payment.label}
                </Text>
                <Text variant='stat'>{payment.total}</Text>
                <Text
                    variant='badge'
                    tone='secondary'>
                    {payment.summary}
                </Text>
            </Card>
            <Badge tone='sand'>{payment.hold}</Badge>
            <Text
                variant='meta'
                tone='muted'>
                {payment.methodsLabel}
            </Text>
            <Card padding='none'>
                <ul className='divide-y divide-border'>
                    {payment.methods.map((method, index) => (
                        <JourneyPayMethodRow
                            key={method.label}
                            {...method}
                            chosen={index === 0}
                        />
                    ))}
                </ul>
            </Card>
            <Button
                asChild
                size='sm'
                className='mt-auto w-full'>
                <span>{pay}</span>
            </Button>
            <div className='flex items-center justify-center gap-1.5 text-text-muted'>
                <Lock
                    aria-hidden
                    className='size-3'
                />
                <Text
                    as='span'
                    variant='badge'
                    tone='muted'>
                    {payment.secure}
                </Text>
            </div>
        </>
    )
}
