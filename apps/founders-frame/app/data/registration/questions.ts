import type { QuestionInputConfig } from '~/types/registration'

export const QUESTION_KINDS = [
    'age',
    'gender',
    'city',
    'organisation',
    'emergency_contact',
    'tshirt_size',
    'food_preference',
    'custom',
] as const

export const QUESTION_INPUTS: Record<(typeof QUESTION_KINDS)[number], QuestionInputConfig> = {
    age: { type: 'text', inputMode: 'numeric', autoComplete: 'off' },
    gender: { options: ['Woman', 'Man', 'Non-binary', 'Prefer not to say'], autoComplete: 'sex' },
    city: { type: 'text', inputMode: 'text', autoComplete: 'address-level2' },
    organisation: { type: 'text', inputMode: 'text', autoComplete: 'organization' },
    emergency_contact: { type: 'tel', inputMode: 'tel', autoComplete: 'off' },
    tshirt_size: { options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], autoComplete: 'off' },
    food_preference: { options: ['Veg', 'Non-veg', 'Vegan', 'Jain'], autoComplete: 'off' },
    custom: { type: 'text', inputMode: 'text', autoComplete: 'off', multiline: true },
}
