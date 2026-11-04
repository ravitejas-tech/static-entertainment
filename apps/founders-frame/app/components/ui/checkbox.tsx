import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { Check } from 'lucide-react'
import { cn } from '~/lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
    children: ReactNode
    ref?: Ref<HTMLInputElement>
}

export function Checkbox({ children, className, ...props }: CheckboxProps) {
    return (
        <label className={cn('flex cursor-pointer items-start gap-3', className)}>
            <span className='relative mt-0.5 grid size-5 shrink-0 place-items-center'>
                <input
                    type='checkbox'
                    className={cn(
                        'peer size-5 cursor-pointer appearance-none rounded border bg-surface transition-colors checked:border-accent checked:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                        props['aria-invalid'] === true ? 'border-danger' : 'border-text-muted',
                    )}
                    {...props}
                />
                <Check
                    className='pointer-events-none absolute size-3.5 text-accent-foreground opacity-0 peer-checked:opacity-100'
                    aria-hidden
                />
            </span>
            {children}
        </label>
    )
}
