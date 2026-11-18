import type { CartLine, MemberProfileInput, OrderRequest, RegistrationFormValues } from '~/types/registration'

function toProfile({ memberType, jobTitle, companyName }: RegistrationFormValues): MemberProfileInput {
    return {
        memberType,
        ...(jobTitle && { jobTitle }),
        ...(companyName && { company: { name: companyName } }),
    }
}

const filledAnswers = (answers: Record<string, string>) =>
    Object.fromEntries(Object.entries(answers).filter(([, value]) => value))

export function toOrderRequest(
    eventId: string,
    lines: CartLine[],
    values: RegistrationFormValues,
    promoCode: string | undefined,
): OrderRequest {
    const { name, email, phone, answers, marketingConsent } = values
    return {
        eventId,
        items: lines.map(({ option, quantity }) => ({ ticketTypeId: option.id, quantity })),
        buyer: { name, email, phone },
        answers: filledAnswers(answers),
        profile: toProfile(values),
        ...(promoCode && { promoCode }),
        marketingConsent,
        termsAccepted: true,
    }
}
