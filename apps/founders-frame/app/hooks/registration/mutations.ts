import { toast } from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { PAYMENT_TOAST, PAYMENT_TOASTS } from '~/data/registration/payment'
import { registrationErrorMessage } from '~/lib/registration/errors'
import { openRazorpayCheckout } from '~/services/razorpay'
import { createOrder, verifyPayment } from '~/services/registration'

const toastError = (error: Error) => toast.error(registrationErrorMessage(error), PAYMENT_TOAST)

export const useCreateOrder = createMutation({
    mutationKey: ['registration', 'create-order'],
    mutationFn: createOrder,
    onSuccess: ({ payment }) =>
        toast.success(payment.provider === 'free' ? PAYMENT_TOASTS.booked : PAYMENT_TOASTS.held, PAYMENT_TOAST),
    onError: toastError,
})

export const useRazorpayCheckout = createMutation({
    mutationKey: ['registration', 'razorpay'],
    mutationFn: openRazorpayCheckout,
    onSuccess: (response) => {
        if (!response) toast(PAYMENT_TOASTS.dismissed, PAYMENT_TOAST)
    },
    onError: toastError,
})

export const useVerifyPayment = createMutation({
    mutationKey: ['registration', 'verify-payment'],
    mutationFn: verifyPayment,
    onSuccess: ({ status }) =>
        status === 'paid'
            ? toast.success(PAYMENT_TOASTS.paid, PAYMENT_TOAST)
            : toast.error(PAYMENT_TOASTS.needsAttention, PAYMENT_TOAST),
    onError: toastError,
})
