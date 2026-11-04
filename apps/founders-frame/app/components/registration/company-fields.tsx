import { useFormContext } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'
import { FOUNDER_STAGE_LABELS, INDUSTRY_LABELS } from '~/data/members/options'
import { FORM_COPY } from '~/data/registration/form'
import { FIELD_IDS } from '~/data/registration/page'
import { toOptions } from '~/lib/options'
import type { RegistrationFormInput, RegistrationMode } from '~/types/registration'

const { fields } = FORM_COPY
const INDUSTRY_OPTIONS = toOptions(INDUSTRY_LABELS)
const STAGE_OPTIONS = toOptions(FOUNDER_STAGE_LABELS)

export function CompanyFields({ mode }: { mode: RegistrationMode }) {
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
            {mode === 'apply' && (
                <>
                    <Field
                        id={FIELD_IDS.companyWebsite}
                        label={fields.companyWebsite.label}
                        error={errors.companyWebsite?.message}>
                        {(control) => (
                            <Input
                                {...control}
                                {...register('companyWebsite')}
                                type='url'
                                inputMode='url'
                                autoComplete='url'
                                placeholder={fields.companyWebsite.placeholder}
                            />
                        )}
                    </Field>
                    <Field
                        id={FIELD_IDS.industry}
                        label={fields.industry.label}
                        error={errors.industry?.message}>
                        {(control) => (
                            <Select
                                {...control}
                                {...register('industry')}
                                options={INDUSTRY_OPTIONS}
                                placeholder={fields.industry.placeholder}
                            />
                        )}
                    </Field>
                    <Field
                        id={FIELD_IDS.stage}
                        label={fields.stage.label}
                        hint={fields.stage.hint}
                        error={errors.stage?.message}>
                        {(control) => (
                            <Select
                                {...control}
                                {...register('stage')}
                                options={STAGE_OPTIONS}
                                placeholder={fields.stage.placeholder}
                            />
                        )}
                    </Field>
                </>
            )}
        </div>
    )
}
