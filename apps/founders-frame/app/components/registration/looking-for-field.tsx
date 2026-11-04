import { useFormContext } from 'react-hook-form'
import { ChoiceChips } from '~/components/ui/choice-chips'
import { LOOKING_FOR_LABELS } from '~/data/members/options'
import { FORM_COPY } from '~/data/registration/form'
import { toOptions } from '~/lib/options'
import type { RegistrationFormInput } from '~/types/registration'

const LOOKING_FOR_OPTIONS = toOptions(LOOKING_FOR_LABELS)

export function LookingForField() {
    const { register } = useFormContext<RegistrationFormInput>()

    return (
        <ChoiceChips
            legend={FORM_COPY.fields.lookingFor.label}
            options={LOOKING_FOR_OPTIONS}
            {...register('lookingFor')}
        />
    )
}
