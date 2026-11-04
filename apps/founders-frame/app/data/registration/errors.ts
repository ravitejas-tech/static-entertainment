export const REGISTRATION_ERRORS = {
    event_unavailable: 'This event is no longer taking registrations.',
    sales_paused: 'Registration is paused for now. Please check back soon.',
    invalid_name: 'Please check your name.',
    invalid_email: 'Please check your email address.',
    invalid_phone: 'Please check your mobile number.',
    invalid_answers: 'Please check your answers.',
    answers_missing: 'Please answer the required questions.',
    ticket_unavailable: 'That place isn’t available any more. Please choose another.',
    quantity_limit: 'You can reserve one place per person.',
    sold_out: 'This event is full.',
    too_many_holds: 'You have a few registrations in progress. Please finish or wait for them to expire.',
    approval_required: 'This place needs an application. Please apply instead.',
    already_applied: 'You’ve already applied to this event. Check your email for your application link.',
    application_not_found: 'We couldn’t find this application.',
    application_not_approved: 'This application hasn’t been approved yet.',
    application_closed: 'This application is closed.',
    invalid_profile: 'Please check your professional details.',
    bad_request: 'Something in the form wasn’t right. Please try again.',
    network: 'You seem to be offline. Check your connection and try again.',
    unknown: 'Something went wrong on our side. Please try again.',
} as const

export const REGISTRATION_TOAST = { id: 'registration' } as const

export const REGISTRATION_TOASTS = {
    rsvp: 'You’re on the list.',
    applied: 'Your application is in.',
    confirmed: 'Your place is confirmed.',
} as const
