export const FORM_ERRORS = {
    tickets: 'Choose at least one ticket.',
    name: 'Enter your full name.',
    email: 'Enter a valid email address.',
    phone: 'Enter a 10-digit mobile number.',
    memberType: 'Choose what best describes you.',
    answer: 'Please answer this question.',
    choice: 'Choose an option.',
    tooLong: 'That’s a little long. Please shorten it.',
    terms: 'Please accept the terms to continue.',
} as const

export const FORM_COPY = {
    sections: {
        tickets: { title: 'Tickets', body: '' },
        personal: {
            title: 'Personal details',
            body: 'We send your QR ticket to this email and use your number only for updates about this event.',
        },
        role: { title: 'Professional role', body: 'This helps us introduce you to the right people in the room.' },
        company: { title: 'Company or organisation', body: 'Optional for students and professionals.' },
        questions: { title: 'A few questions', body: 'Short, honest answers help us plan the room.' },
        payment: { title: 'Review and pay', body: '' },
    },
    fields: {
        name: { label: 'Full name', placeholder: 'Your name' },
        email: { label: 'Email', placeholder: 'you@company.com' },
        phone: { label: 'Mobile number', placeholder: '98765 43210' },
        memberType: { label: 'What best describes you?', placeholder: 'Choose one' },
        jobTitle: { label: 'Role or title', placeholder: 'Co-founder, Product manager, Angel investor…' },
        companyName: { label: 'Company or organisation', placeholder: 'Company name' },
    },
    selectPlaceholder: 'Choose one',
    terms: 'I agree to the event terms and refund policy, and understand each QR code admits one person once.',
    updates: 'Send me occasional updates about Founders Frame events.',
    phonePrefix: '+91',
} as const

export const CHECKOUT_COPY = {
    tickets: {
        add: (name: string) => `Add one ${name}`,
        remove: (name: string) => `Remove one ${name}`,
        quantity: (name: string) => `${name} quantity`,
        perOrder: (max: number) => (max === 1 ? 'One per booking' : `Up to ${max} per booking`),
        empty: 'Choose your tickets to see your total.',
    },
    summary: {
        line: (quantity: number, name: string) => `${quantity} × ${name}`,
        subtotal: 'Subtotal',
        discount: (code: string) => `Promo ${code}`,
        total: 'Total',
    },
    promo: {
        label: 'Promo code',
        placeholder: 'Enter code',
        apply: 'Apply',
        checking: 'Checking…',
        remove: 'Remove',
        applied: (code: string) => `${code} applied`,
    },
    hold: (time: string) => `Your tickets are held until ${time}. Pay before then to keep them.`,
    pay: (amount: string) => `Pay ${amount}`,
    paying: 'Processing…',
} as const
