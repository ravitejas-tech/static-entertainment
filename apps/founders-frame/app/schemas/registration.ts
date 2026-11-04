import { z } from 'zod'
import { FORM_ERRORS } from '~/data/registration/form'
import { MOBILE_PATTERN, NAME_LENGTH, PHONE_COUNTRY_CODE, TEXT_MAX } from '~/data/registration/limits'
import { MEMBER_TYPES } from '~/data/members/options'
import { isSelectQuestion } from '~/lib/registration/questions'
import { localMobileDigits } from '~/lib/phone'
import type { EventQuestion } from '~/types/events'

const shortText = z.string().trim().max(TEXT_MAX.short, FORM_ERRORS.tooLong)

function answerSchema(question: EventQuestion) {
    return z
        .string()
        .trim()
        .max(TEXT_MAX.answer, FORM_ERRORS.tooLong)
        .refine(
            (value) => !question.required || value.length > 0,
            isSelectQuestion(question) ? FORM_ERRORS.choice : FORM_ERRORS.answer,
        )
}

export function buildRegistrationSchema(questions: EventQuestion[]) {
    return z.object({
        name: z.string().trim().min(NAME_LENGTH.min, FORM_ERRORS.name).max(NAME_LENGTH.max, FORM_ERRORS.tooLong),
        email: z.string().trim().toLowerCase().pipe(z.email(FORM_ERRORS.email)),
        phone: z
            .string()
            .trim()
            .refine((value) => MOBILE_PATTERN.test(localMobileDigits(value)), FORM_ERRORS.phone)
            .transform((value) => `${PHONE_COUNTRY_CODE}${localMobileDigits(value)}`),
        memberType: z.enum(MEMBER_TYPES, FORM_ERRORS.memberType),
        jobTitle: shortText,
        companyName: shortText,
        answers: z.object(Object.fromEntries(questions.map((question) => [question.id, answerSchema(question)]))),
        termsAccepted: z.boolean().refine((value) => value, FORM_ERRORS.terms),
        marketingConsent: z.boolean(),
    })
}
