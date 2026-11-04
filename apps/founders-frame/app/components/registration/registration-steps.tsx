import type { ReactNode } from 'react'
import { CompanyFields } from '~/components/registration/company-fields'
import { FormSection } from '~/components/registration/form-section'
import { PersonalFields } from '~/components/registration/personal-fields'
import { QuestionField } from '~/components/registration/question-field'
import { RoleFields } from '~/components/registration/role-fields'
import { TicketPicker, type TicketPickerProps } from '~/components/registration/ticket-picker'
import { FORM_COPY } from '~/data/registration/form'
import { FIELD_IDS } from '~/data/registration/page'
import { formSteps } from '~/lib/registration/steps'
import type { EventDetail } from '~/types/events'
import type { FormStep } from '~/types/registration'

const FIRST_STEP_ORDER = 5

export interface RegistrationStepsProps extends Pick<TicketPickerProps, 'quantityOf' | 'canAdd' | 'onChange'> {
    event: EventDetail
}

export function RegistrationSteps({ event, ...picker }: RegistrationStepsProps) {
    const content: Record<FormStep, ReactNode> = {
        tickets: (
            <div
                id={FIELD_IDS.tickets}
                className='scroll-mt-24'>
                <TicketPicker
                    options={event.options}
                    trigger='load'
                    order={FIRST_STEP_ORDER + 2}
                    {...picker}
                />
            </div>
        ),
        personal: <PersonalFields />,
        role: <RoleFields />,
        company: <CompanyFields />,
        questions: (
            <div className='space-y-5'>
                {event.questions.map((question) => (
                    <QuestionField
                        key={question.id}
                        question={question}
                    />
                ))}
            </div>
        ),
    }

    return (
        <div className='space-y-12 sm:space-y-14'>
            {formSteps(event.questions.length).map((step, index) => (
                <FormSection
                    key={step}
                    step={index + 1}
                    title={FORM_COPY.sections[step].title}
                    body={FORM_COPY.sections[step].body || undefined}
                    {...(index === 0 && { trigger: 'load', order: FIRST_STEP_ORDER })}>
                    {content[step]}
                </FormSection>
            ))}
        </div>
    )
}
