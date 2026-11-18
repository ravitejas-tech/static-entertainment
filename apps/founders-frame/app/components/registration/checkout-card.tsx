import type { ReactNode } from 'react'
import { StepNumber } from '~/components/registration/step-number'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { formatStepNumber } from '~/lib/format'

export interface CheckoutCardProps {
    step: number
    title: string
    children: ReactNode
}

export function CheckoutCard({ step, title, children }: CheckoutCardProps) {
    return (
        <Card
            floating
            padding='lg'>
            <fieldset className='flex min-w-0 flex-col gap-5'>
                <legend className='contents'>
                    <Text
                        as='h2'
                        variant='title'
                        className='flex items-center gap-3'>
                        <StepNumber>{formatStepNumber(step)}</StepNumber>
                        {title}
                    </Text>
                </legend>
                {children}
            </fieldset>
        </Card>
    )
}
