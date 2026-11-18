import type { RegistrationErrorCode } from '~/types/registration'

export const REGISTRATION_ERRORS = {
    event_unavailable: 'This event isn’t taking bookings any more.',
    sales_paused: 'Bookings are paused for now. Please check back soon.',
    invalid_name: 'Please check your name.',
    invalid_email: 'Please check your email address.',
    invalid_phone: 'Please check your mobile number.',
    invalid_items: 'Something in your booking didn’t add up. Refresh the page and try again.',
    invalid_answers: 'Please check your answers.',
    answers_missing: 'Please answer the required questions.',
    ticket_unavailable: 'One of those tickets just went off sale. We’ve refreshed what’s left.',
    quantity_limit: 'That’s more tickets than one booking allows. Try fewer.',
    sold_out: 'Those tickets just sold out. We’ve refreshed what’s left.',
    too_many_holds:
        'You have a few unpaid bookings waiting. Finish one, or try again in 15 minutes when they’re released.',
    promo_invalid: 'That promo code doesn’t work for this event.',
    promo_exhausted: 'That promo code has been fully used.',
    order_not_found: 'We couldn’t find that booking. Please start again.',
    payment_invalid: 'We couldn’t confirm that payment. If money left your account, write to us and we’ll sort it out.',
    amount_mismatch: 'We couldn’t confirm that payment. If money left your account, write to us and we’ll sort it out.',
    payment_unavailable: 'Payments are down for a moment. Please try again in a minute.',
    invalid_profile: 'Please check your professional details.',
    bad_request: 'Something in the form wasn’t right. Please try again.',
    network: 'You seem to be offline. Check your connection and try again.',
    unknown: 'Something went wrong on our side. Please try again.',
} as const

export const REFRESH_AVAILABILITY_ON = ['sold_out', 'ticket_unavailable', 'sales_paused', 'event_unavailable'] as const

export const PROMO_ERROR_CODES = ['promo_invalid', 'promo_exhausted'] as const

export const FIELD_ERROR_CODES: Partial<Record<RegistrationErrorCode, 'name' | 'email' | 'phone'>> = {
    invalid_name: 'name',
    invalid_email: 'email',
    invalid_phone: 'phone',
}
