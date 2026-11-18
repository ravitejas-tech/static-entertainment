import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { buildRegistrationSchema } from '~/schemas/registration'
import type { EventDetail } from '~/types/events'
import type { RegistrationFormInput, RegistrationFormValues } from '~/types/registration'

export function useRegistrationForm(event: EventDetail) {
    const schema = useMemo(() => buildRegistrationSchema(event.questions), [event.questions])

    return useForm<RegistrationFormInput, unknown, RegistrationFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            jobTitle: '',
            companyName: '',
            answers: Object.fromEntries(event.questions.map(({ id }) => [id, ''])),
            termsAccepted: false,
            marketingConsent: false,
        },
    })
}
