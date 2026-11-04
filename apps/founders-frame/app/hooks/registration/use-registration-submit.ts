import { useNavigate } from 'react-router'
import { ticketPath } from '~/data/navigation'
import { useCreateRsvp, useSubmitApplication } from '~/hooks/registration/mutations'
import { toApplicationRequest, toRsvpRequest } from '~/lib/registration/request'
import type { EventDetail } from '~/types/events'
import type { RegistrationFormValues, RegistrationMode } from '~/types/registration'

export function useRegistrationSubmit(event: EventDetail, mode: RegistrationMode) {
    const navigate = useNavigate()
    const rsvp = useCreateRsvp()
    const application = useSubmitApplication()

    const submit = (values: RegistrationFormValues) =>
        mode === 'rsvp'
            ? rsvp.mutate(toRsvpRequest(event.id, values), {
                  onSuccess: ({ order }) => navigate(ticketPath(order.accessToken)),
              })
            : application.mutate(toApplicationRequest(event.id, values))

    return {
        submit,
        pending: rsvp.isPending || application.isPending,
        submitted: application.data?.application ?? null,
    }
}
