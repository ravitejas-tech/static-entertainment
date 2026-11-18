import type { Ref, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { ControlFrame } from '~/components/ui/control-frame'
import { CONTROL_TEXT } from '~/data/ui/forms'
import { cn } from '~/lib/utils'
import type { Option } from '~/types/options'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: readonly Option[]
    placeholder: string
    ref?: Ref<HTMLSelectElement>
}

export function Select({ options, placeholder, className, ...props }: SelectProps) {
    return (
        <ControlFrame
            invalid={props['aria-invalid'] === true}
            className={className}>
            <select
                className={cn(CONTROL_TEXT, 'cursor-pointer appearance-none pr-11 pl-4')}
                {...props}>
                <option value=''>{placeholder}</option>
                {options.map(({ value, label }) => (
                    <option
                        key={value}
                        value={value}>
                        {label}
                    </option>
                ))}
            </select>
            <ChevronDown
                className='pointer-events-none absolute right-4 size-5 text-text-muted'
                aria-hidden
            />
        </ControlFrame>
    )
}
