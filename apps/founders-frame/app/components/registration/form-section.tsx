import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface FormSectionProps {
    step: number
    title: string
    body?: string
    children: ReactNode
}

export function FormSection({ step, title, body, children }: FormSectionProps) {
    return (
        <fieldset className='space-y-5 border-t border-border pt-8 first:border-t-0 first:pt-0'>
            <legend className='contents'>
                <span className='flex items-baseline gap-3'>
                    <Text
                        as='span'
                        variant='label'
                        tone='accent'
                        className='tabular-nums'>
                        {String(step).padStart(2, '0')}
                    </Text>
                    <Text
                        as='span'
                        variant='title'>
                        {title}
                    </Text>
                </span>
            </legend>
            {body && (
                <Text
                    variant='small'
                    tone='secondary'>
                    {body}
                </Text>
            )}
            {children}
        </fieldset>
    )
}
