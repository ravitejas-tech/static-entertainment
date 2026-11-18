import { useFormContext } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'
import { MEMBER_TYPE_LABELS } from '~/data/members/options'
import { FORM_COPY } from '~/data/registration/form'
import { FIELD_IDS } from '~/data/registration/page'
import { toOptions } from '~/lib/options'
import type { RegistrationFormInput } from '~/types/registration'

const { fields } = FORM_COPY
const MEMBER_TYPE_OPTIONS = toOptions(MEMBER_TYPE_LABELS)

export function RoleFields() {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegistrationFormInput>()

    return (
        <div className='grid gap-5 sm:grid-cols-2'>
            <Field
                id={FIELD_IDS.memberType}
                label={fields.memberType.label}
                error={errors.memberType?.message}
                required>
                {(control) => (
                    <Select
                        {...control}
                        {...register('memberType')}
                        options={MEMBER_TYPE_OPTIONS}
                        placeholder={fields.memberType.placeholder}
                    />
                )}
            </Field>
            <Field
                id={FIELD_IDS.jobTitle}
                label={fields.jobTitle.label}
                error={errors.jobTitle?.message}>
                {(control) => (
                    <Input
                        {...control}
                        {...register('jobTitle')}
                        autoComplete='organization-title'
                        placeholder={fields.jobTitle.placeholder}
                    />
                )}
            </Field>
        </div>
    )
}
