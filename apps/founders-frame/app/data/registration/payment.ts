export const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js'

export const RAZORPAY_THEME_VAR = '--accent'

export const TEST_PAYMENT_COPY = {
    badge: 'Test mode',
    title: 'Test checkout',
    body: 'No money moves. This stands in for the real payment screen.',
    pay: (amount: string) => `Pay ${amount}`,
    cancel: 'Cancel',
} as const

export const PAYMENT_TOAST = { id: 'registration-payment' } as const

export const PAYMENT_TOASTS = {
    held: 'Your tickets are held while you pay.',
    booked: 'You’re booked.',
    paid: 'Payment confirmed. You’re booked.',
    needsAttention: 'We received your payment but couldn’t confirm your tickets. We’ll sort it out and email you.',
    dismissed: 'Payment not finished. Your tickets are still held, so you can pay again.',
} as const
