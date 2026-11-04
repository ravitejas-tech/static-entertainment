import type { HTMLAttributes, HTMLInputTypeAttribute } from 'react'
import type { z } from 'zod'
import type { REGISTRATION_ERRORS } from '~/data/registration/errors'
import type { FORM_COPY } from '~/data/registration/form'
import type { REGISTRATION_PAGE } from '~/data/registration/page'
import type { createOrderResultSchema, verifyPaymentResultSchema } from '~/schemas/functions'
import type { buildRegistrationSchema } from '~/schemas/registration'
import type { RegistrationOption } from '~/types/events'
import type { MemberType } from '~/types/members'

export interface QuestionInputConfig {
    autoComplete: string
    type?: HTMLInputTypeAttribute
    inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
    options?: readonly string[]
    multiline?: boolean
}

export interface MemberProfileInput {
    memberType: MemberType
    jobTitle?: string
    company?: { name: string }
}

export type Cart = Record<string, number>

export interface CartLine {
    option: RegistrationOption
    quantity: number
    amount: number
}

export interface OrderRequest {
    eventId: string
    items: { ticketTypeId: string; quantity: number }[]
    buyer: { name: string; email: string; phone: string }
    answers: Record<string, string>
    profile: MemberProfileInput
    promoCode?: string
    marketingConsent: boolean
    termsAccepted: true
}

export type CreateOrderResult = z.infer<typeof createOrderResultSchema>

export type PendingOrder = CreateOrderResult['order']

export type RazorpayPayment = Extract<CreateOrderResult['payment'], { provider: 'razorpay' }>

export interface VerifyPaymentInput {
    orderId: string
    razorpayOrderId?: string
    razorpayPaymentId?: string
    razorpaySignature?: string
}

export type VerifyPaymentResult = z.infer<typeof verifyPaymentResultSchema>

export interface PromoQuoteInput {
    eventId: string
    code: string
    subtotal: number
}

export interface RazorpayCheckoutRequest {
    payment: RazorpayPayment
    description: string
    prefill: { name: string; email: string; contact: string }
}

export interface RazorpayResponse {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
}

export interface RazorpayOptions {
    key: string
    order_id: string
    amount: number
    currency: string
    name: string
    description: string
    prefill: RazorpayCheckoutRequest['prefill']
    theme: { color: string }
    modal: { ondismiss: () => void }
    handler: (response: RazorpayResponse) => void
}

export interface RazorpayWindow {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void }
}

type RegistrationSchema = ReturnType<typeof buildRegistrationSchema>

export type RegistrationFormInput = z.input<RegistrationSchema>

export type RegistrationFormValues = z.output<RegistrationSchema>

export type RegistrationErrorCode = keyof typeof REGISTRATION_ERRORS

export type BlockedReason = keyof (typeof REGISTRATION_PAGE)['blocked']

export type FormStep = Exclude<keyof (typeof FORM_COPY)['sections'], 'payment'>
