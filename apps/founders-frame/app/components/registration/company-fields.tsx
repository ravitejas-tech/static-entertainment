import { useFormContext } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { FORM_COPY } from '~/data/registration/form'
import { FIELD_IDS } from '~/data/registration/page'
import type { RegistrationFormInput } from '~/types/registration'

const { fields } = FORM_COPY

export function CompanyFields() {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegistrationFormInput>()

    return (
        <div className='grid gap-5 sm:grid-cols-2'>
            <Field
                id={FIELD_IDS.companyName}
                label={fields.companyName.label}
                error={errors.companyName?.message}>
                {(control) => (
                    <Input
                        {...control}
                        {...register('companyName')}
                        autoComplete='organization'
                        placeholder={fields.companyName.placeholder}
                    />
                )}
            </Field>
        </div>
    )
}
