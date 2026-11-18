import { useFormContext } from 'react-hook-form'
import { Checkbox } from '~/components/ui/checkbox'
import { FieldError } from '~/components/ui/field-error'
import { Text } from '~/components/ui/text'
import { FORM_COPY } from '~/data/registration/form'
import type { RegistrationFormInput } from '~/types/registration'

const TERMS_ERROR_ID = 'registration-terms-error'

export function ConsentFields() {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegistrationFormInput>()
    const termsError = errors.termsAccepted?.message

    return (
        <div className='space-y-4'>
            <div className='space-y-2'>
                <Checkbox
                    {...register('termsAccepted')}
                    aria-invalid={Boolean(termsError)}
                    aria-describedby={termsError ? TERMS_ERROR_ID : undefined}>
                    <Text as='span'>{FORM_COPY.terms}</Text>
                </Checkbox>
                {termsError && <FieldError id={TERMS_ERROR_ID}>{termsError}</FieldError>}
            </div>
            <Checkbox {...register('marketingConsent')}>
                <Text
                    as='span'
                    tone='secondary'>
                    {FORM_COPY.updates}
                </Text>
            </Checkbox>
        </div>
    )
}
