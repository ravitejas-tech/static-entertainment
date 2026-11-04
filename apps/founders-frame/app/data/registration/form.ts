export const FORM_ERRORS = {
    seat: 'Choose the place you’re applying for.',
    name: 'Enter your full name.',
    email: 'Enter a valid email address.',
    phone: 'Enter a 10-digit mobile number.',
    memberType: 'Choose what best describes you.',
    jobTitle: 'Tell us your role.',
    url: 'Enter a valid link, like linkedin.com/in/your-name.',
    answer: 'Please answer this question.',
    choice: 'Choose an option.',
    tooLong: 'That’s a little long. Please shorten it.',
    terms: 'Please accept the terms to continue.',
} as const

export const FORM_COPY = {
    sections: {
        seat: { title: 'Your place', body: 'Choose the place that fits you best.' },
        personal: {
            title: 'Personal details',
            body: 'We use these to confirm your place and send updates about this event.',
        },
        role: { title: 'Professional role', body: 'This helps us introduce you to the right people in the room.' },
        company: { title: 'Company or organisation', body: 'Optional for students and professionals.' },
        questions: {
            title: 'A few questions',
            body: 'Short, honest answers help us understand what you’re looking for.',
        },
        links: { title: 'Profile link', body: 'Optional. A LinkedIn profile helps us review applications fairly.' },
        consent: { title: 'Consent', body: '' },
    },
    fields: {
        name: { label: 'Full name', placeholder: 'Your name' },
        email: { label: 'Email', placeholder: 'you@company.com' },
        phone: { label: 'Mobile number', placeholder: '98765 43210' },
        memberType: { label: 'What best describes you?', placeholder: 'Choose one' },
        jobTitle: { label: 'Role or title', placeholder: 'Co-founder, Product manager, Angel investor…' },
        companyName: { label: 'Company or organisation', placeholder: 'Company name' },
        companyWebsite: { label: 'Website', placeholder: 'yourcompany.com' },
        industry: { label: 'Industry', placeholder: 'Choose an industry' },
        stage: { label: 'Stage', placeholder: 'Choose a stage', hint: 'If you’re building a company.' },
        linkedinUrl: { label: 'LinkedIn', placeholder: 'linkedin.com/in/your-name' },
        lookingFor: { label: 'What are you hoping to find?' },
    },
    selectPlaceholder: 'Choose one',
    terms: 'I agree to the event terms, and understand my QR code admits one person once.',
    updates: 'Send me occasional updates about Founders Frame events.',
    phonePrefix: '+91',
} as const
