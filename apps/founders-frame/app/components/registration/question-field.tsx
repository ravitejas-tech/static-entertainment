import { useFormContext } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { FORM_COPY } from '~/data/registration/form'
import { questionFieldId } from '~/data/registration/page'
import { QUESTION_INPUTS } from '~/data/registration/questions'
import { questionOptions } from '~/lib/registration/questions'
import type { EventQuestion } from '~/types/events'
import type { RegistrationFormInput } from '~/types/registration'

export function QuestionField({ question }: { question: EventQuestion }) {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegistrationFormInput>()
    const { options: _options, multiline, ...inputProps } = QUESTION_INPUTS[question.kind]
    const options = questionOptions(question).map((value) => ({ value, label: value }))
    const field = register(`answers.${question.id}`)

    return (
        <Field
            id={questionFieldId(question.id)}
            label={question.label}
            error={errors.answers?.[question.id]?.message}
            required={question.required}>
            {(control) =>
                options.length > 0 ? (
                    <Select
                        {...control}
                        {...field}
                        options={options}
                        placeholder={FORM_COPY.selectPlaceholder}
                        autoComplete={inputProps.autoComplete}
                    />
                ) : multiline ? (
                    <Textarea
                        {...control}
                        {...field}
                    />
                ) : (
                    <Input
                        {...control}
                        {...field}
                        {...inputProps}
                    />
                )
            }
        </Field>
    )
}
