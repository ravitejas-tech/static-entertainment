import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'
import { Text } from '~/components/ui/text'
import { ToggleChips } from '~/components/ui/toggle-chips'
import type { SelectOption } from '~/components/ui/select'

export interface ToggleChipsFieldProps<Values extends FieldValues> {
    name: Path<Values>
    label: string
    options: readonly SelectOption[]
    hint?: string
}

export function ToggleChipsField<Values extends FieldValues>({
    name,
    label,
    options,
    hint,
}: ToggleChipsFieldProps<Values>) {
    const { control } = useFormContext<Values>()

    return (
        <fieldset className='min-w-0 space-y-2'>
            <Text
                as='legend'
                variant='label'
                className='mb-2'>
                {label}
            </Text>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <ToggleChips
                        options={options}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            {hint && (
                <Text
                    variant='small'
                    tone='muted'>
                    {hint}
                </Text>
            )}
        </fieldset>
    )
}
