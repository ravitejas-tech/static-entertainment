import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { buildRegistrationSchema } from '~/schemas/registration'
import type { EventDetail, RegistrationOption } from '~/types/events'
import type { RegistrationFormInput, RegistrationFormValues, RegistrationMode } from '~/types/registration'

export function useRegistrationForm(
    event: EventDetail,
    mode: RegistrationMode,
    options: RegistrationOption[],
    seat: string | null,
) {
    const schema = useMemo(() => buildRegistrationSchema(event.questions, mode), [event.questions, mode])
    const preselected = options.find(({ id }) => id === seat) ?? (options.length === 1 ? options[0] : undefined)

    return useForm<RegistrationFormInput, unknown, RegistrationFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            ticketTypeId: preselected?.id ?? '',
            name: '',
            email: '',
            phone: '',
            jobTitle: '',
            companyName: '',
            companyWebsite: '',
            industry: '',
            stage: '',
            linkedinUrl: '',
            lookingFor: [],
            answers: Object.fromEntries(event.questions.map(({ id }) => [id, ''])),
            termsAccepted: false,
            marketingConsent: false,
        },
    })
}
