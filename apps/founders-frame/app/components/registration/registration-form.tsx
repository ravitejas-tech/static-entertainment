import { FormProvider } from 'react-hook-form'
import { CompanyFields } from '~/components/registration/company-fields'
import { ConsentFields } from '~/components/registration/consent-fields'
import { FormSection } from '~/components/registration/form-section'
import { LinkedinField } from '~/components/registration/linkedin-field'
import { LookingForField } from '~/components/registration/looking-for-field'
import { PersonalFields } from '~/components/registration/personal-fields'
import { QuestionField } from '~/components/registration/question-field'
import { RoleFields } from '~/components/registration/role-fields'
import { SeatField } from '~/components/registration/seat-field'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { FORM_COPY } from '~/data/registration/form'
import { REGISTRATION_PAGE } from '~/data/registration/page'
import { useRegistrationForm } from '~/hooks/registration/use-registration-form'
import type { EventDetail, RegistrationOption } from '~/types/events'
import type { RegistrationFormValues, RegistrationMode } from '~/types/registration'

const { sections } = FORM_COPY

export interface RegistrationFormProps {
    event: EventDetail
    mode: RegistrationMode
    options: RegistrationOption[]
    seat: string | null
    pending: boolean
    onSubmit: (values: RegistrationFormValues) => void
}

export function RegistrationForm({ event, mode, options, seat, pending, onSubmit }: RegistrationFormProps) {
    const form = useRegistrationForm(event, mode, options, seat)
    const copy = REGISTRATION_PAGE.modes[mode]
    const steps = [
        ...(options.length > 1 ? [{ ...sections.seat, content: <SeatField options={options} /> }] : []),
        { ...sections.personal, content: <PersonalFields /> },
        { ...sections.role, content: <RoleFields mode={mode} /> },
        { ...sections.company, content: <CompanyFields mode={mode} /> },
        ...(mode === 'apply' || event.questions.length > 0
            ? [
                  {
                      ...sections.questions,
                      content: (
                          <div className='space-y-5'>
                              {event.questions.map((question) => (
                                  <QuestionField
                                      key={question.id}
                                      question={question}
                                  />
                              ))}
                              {mode === 'apply' && <LookingForField />}
                          </div>
                      ),
                  },
              ]
            : []),
        ...(mode === 'apply' ? [{ ...sections.links, content: <LinkedinField /> }] : []),
        { ...sections.consent, content: <ConsentFields /> },
    ]

    return (
        <FormProvider {...form}>
            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'>
                {steps.map(({ title, body, content }, index) => (
                    <FormSection
                        key={title}
                        step={index + 1}
                        title={title}
                        body={body || undefined}>
                        {content}
                    </FormSection>
                ))}
                <Button
                    type='submit'
                    disabled={pending}
                    className='w-full sm:w-auto'>
                    {pending && <Spinner />}
                    {pending ? copy.submitting : copy.submit}
                </Button>
            </form>
        </FormProvider>
    )
}
