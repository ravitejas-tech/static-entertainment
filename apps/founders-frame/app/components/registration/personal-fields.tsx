import { useFormContext } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { FORM_COPY } from '~/data/registration/form'
import { FIELD_IDS } from '~/data/registration/page'
import type { RegistrationFormInput } from '~/types/registration'

const { fields } = FORM_COPY

export function PersonalFields() {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegistrationFormInput>()

    return (
        <div className='grid gap-5 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
                <Field
                    id={FIELD_IDS.name}
                    label={fields.name.label}
                    error={errors.name?.message}
                    required>
                    {(control) => (
                        <Input
                            {...control}
                            {...register('name')}
                            autoComplete='name'
                            placeholder={fields.name.placeholder}
                        />
                    )}
                </Field>
            </div>
            <Field
                id={FIELD_IDS.email}
                label={fields.email.label}
                error={errors.email?.message}
                required>
                {(control) => (
                    <Input
                        {...control}
                        {...register('email')}
                        type='email'
                        inputMode='email'
                        autoComplete='email'
                        placeholder={fields.email.placeholder}
                    />
                )}
            </Field>
            <Field
                id={FIELD_IDS.phone}
                label={fields.phone.label}
                error={errors.phone?.message}
                required>
                {(control) => (
                    <Input
                        {...control}
                        {...register('phone')}
                        type='tel'
                        inputMode='tel'
                        autoComplete='tel-national'
                        leading={FORM_COPY.phonePrefix}
                        placeholder={fields.phone.placeholder}
                    />
                )}
            </Field>
        </div>
    )
}
