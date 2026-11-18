import type { ReactNode } from 'react'
import { StepNumber } from '~/components/registration/step-number'
import { Reveal } from '~/components/ui/reveal'
import { RiseWords } from '~/components/ui/rise-words'
import { Text } from '~/components/ui/text'
import { formatStepNumber } from '~/lib/format'

export interface FormSectionProps {
    step: number
    title: string
    body?: string
    trigger?: 'scroll' | 'load'
    order?: number
    children: ReactNode
}

export function FormSection({ step, title, body, trigger = 'scroll', order = 0, children }: FormSectionProps) {
    return (
        <fieldset className='flex min-w-0 flex-col gap-5 sm:gap-6'>
            <legend className='contents'>
                <Text
                    as='h2'
                    variant='section'
                    className='flex items-center gap-3.5'>
                    <StepNumber>
                        <RiseWords
                            text={formatStepNumber(step)}
                            trigger={trigger}
                            startOrder={order}
                        />
                    </StepNumber>
                    <span>
                        <RiseWords
                            text={title}
                            trigger={trigger}
                            startOrder={order + 1}
                        />
                    </span>
                </Text>
            </legend>
            <Reveal
                trigger={trigger}
                order={order + 2}
                className='space-y-5'>
                {body && (
                    <Text
                        variant='small'
                        tone='secondary'>
                        {body}
                    </Text>
                )}
                {children}
            </Reveal>
        </fieldset>
    )
}
