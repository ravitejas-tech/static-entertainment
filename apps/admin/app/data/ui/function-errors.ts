export const FUNCTION_ERROR_CODES = [
    'order_not_found',
    'order_not_refundable',
    'order_not_cancellable',
    'not_allowed',
    'payment_unavailable',
    'invalid_email',
    'invalid_name',
    'bad_request',
    'approval_required',
    'already_applied',
    'application_not_found',
    'application_not_approved',
    'application_closed',
    'invalid_profile',
    'unknown',
] as const

export const UNKNOWN_FUNCTION_ERROR = 'unknown'

export const FUNCTION_ERROR_MESSAGES = {
    order_not_found: "We couldn't find that order, or it has no tickets to send.",
    order_not_refundable: "This order can't be refunded.",
    order_not_cancellable: "This order can't be cancelled.",
    not_allowed: "You don't have access to do that.",
    payment_unavailable: "The payment provider isn't reachable right now. Try again in a minute.",
    invalid_email: 'Enter a valid email address.',
    invalid_name: 'Enter a name between 2 and 80 characters.',
    bad_request: 'Something in the request looks wrong. Check it and try again.',
    approval_required: 'This seat needs an approved application first.',
    already_applied: 'This person has already applied for this event.',
    application_not_found: 'We couldn’t find that application. Refresh and try again.',
    application_not_approved: 'This application hasn’t been approved yet.',
    application_closed: 'This application is already confirmed or withdrawn, so it can’t be changed.',
    invalid_profile: 'The member type isn’t one we recognise.',
    unknown: 'Something went wrong. Try again.',
} as const satisfies Record<(typeof FUNCTION_ERROR_CODES)[number], string>
