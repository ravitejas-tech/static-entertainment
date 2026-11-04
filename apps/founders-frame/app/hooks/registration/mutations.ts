import { toast } from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { REGISTRATION_TOAST, REGISTRATION_TOASTS } from '~/data/registration/errors'
import { registrationErrorMessage } from '~/lib/registration/errors'
import { confirmApplication, createRsvp, submitApplication } from '~/services/registration'

const toastError = (error: Error) => toast.error(registrationErrorMessage(error), REGISTRATION_TOAST)

export const useCreateRsvp = createMutation({
    mutationKey: ['registration', 'rsvp'],
    mutationFn: createRsvp,
    onSuccess: () => toast.success(REGISTRATION_TOASTS.rsvp, REGISTRATION_TOAST),
    onError: toastError,
})

export const useSubmitApplication = createMutation({
    mutationKey: ['registration', 'apply'],
    mutationFn: submitApplication,
    onSuccess: () => toast.success(REGISTRATION_TOASTS.applied, REGISTRATION_TOAST),
    onError: toastError,
})

export const useConfirmApplication = createMutation({
    mutationKey: ['registration', 'confirm'],
    mutationFn: confirmApplication,
    onSuccess: () => toast.success(REGISTRATION_TOASTS.confirmed, REGISTRATION_TOAST),
    onError: toastError,
})
