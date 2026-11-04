import { useFormContext } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { FORM_COPY } from '~/data/registration/form'
import { FIELD_IDS } from '~/data/registration/page'
import type { RegistrationFormInput } from '~/types/registration'

export function LinkedinField() {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegistrationFormInput>()

    return (
        <Field
            id={FIELD_IDS.linkedinUrl}
            label={FORM_COPY.fields.linkedinUrl.label}
            error={errors.linkedinUrl?.message}>
            {(control) => (
                <Input
                    {...control}
                    {...register('linkedinUrl')}
                    type='url'
                    inputMode='url'
                    autoComplete='url'
                    placeholder={FORM_COPY.fields.linkedinUrl.placeholder}
                />
            )}
        </Field>
    )
}
