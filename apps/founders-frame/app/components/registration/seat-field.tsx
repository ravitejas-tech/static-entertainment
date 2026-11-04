import { useFormContext } from 'react-hook-form'
import { FieldError } from '~/components/ui/field-error'
import { Text } from '~/components/ui/text'
import { FIELD_IDS } from '~/data/registration/page'
import type { RegistrationOption } from '~/types/events'
import type { RegistrationFormInput } from '~/types/registration'

export function SeatField({ options }: { options: RegistrationOption[] }) {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegistrationFormInput>()
    const error = errors.ticketTypeId?.message

    return (
        <div className='space-y-3'>
            <div className='grid gap-3 sm:grid-cols-2'>
                {options.map(({ id, name, description }) => (
                    <label
                        key={id}
                        className='cursor-pointer'>
                        <input
                            type='radio'
                            value={id}
                            className='peer sr-only'
                            aria-describedby={error ? `${FIELD_IDS.seat}-error` : undefined}
                            {...register('ticketTypeId')}
                        />
                        <span className='block h-full space-y-1 rounded-lg border border-border bg-surface p-4 transition-colors peer-checked:border-accent peer-checked:bg-tint-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:bg-surface-muted'>
                            <Text variant='strong'>{name}</Text>
                            {description && (
                                <Text
                                    variant='small'
                                    tone='secondary'>
                                    {description}
                                </Text>
                            )}
                        </span>
                    </label>
                ))}
            </div>
            {error && <FieldError id={`${FIELD_IDS.seat}-error`}>{error}</FieldError>}
        </div>
    )
}
