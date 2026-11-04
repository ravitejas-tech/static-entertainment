import type { InputHTMLAttributes, Ref } from 'react'
import { Text } from '~/components/ui/text'
import type { Option } from '~/types/options'

export interface ChoiceChipsProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
    options: readonly Option[]
    legend: string
    ref?: Ref<HTMLInputElement>
}

export function ChoiceChips({ options, legend, ...props }: ChoiceChipsProps) {
    return (
        <fieldset className='space-y-2'>
            <legend>
                <Text
                    as='span'
                    variant='label'>
                    {legend}
                </Text>
            </legend>
            <div className='flex flex-wrap gap-2'>
                {options.map(({ value, label }) => (
                    <label
                        key={value}
                        className='cursor-pointer'>
                        <input
                            type='checkbox'
                            value={value}
                            className='peer sr-only'
                            {...props}
                        />
                        <span className='inline-flex h-10 items-center rounded-full border border-border bg-surface px-4 text-text-secondary transition-colors peer-checked:border-accent peer-checked:bg-tint-navy peer-checked:text-tint-navy-text peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:bg-surface-muted'>
                            <Text
                                as='span'
                                variant='label'
                                tone='inherit'>
                                {label}
                            </Text>
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}
