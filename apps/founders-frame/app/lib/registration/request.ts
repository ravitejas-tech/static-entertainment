import type { ApplicationRequest, MemberProfileInput, RegistrationFormValues, RsvpRequest } from '~/types/registration'

function toProfile({
    memberType,
    jobTitle,
    linkedinUrl,
    lookingFor,
    companyName,
    companyWebsite,
    industry,
    stage,
}: RegistrationFormValues): MemberProfileInput {
    const company = Object.fromEntries(
        Object.entries({ name: companyName, website: companyWebsite, industry, stage }).filter(([, value]) => value),
    )
    return {
        memberType,
        ...(jobTitle && { jobTitle }),
        ...(linkedinUrl && { linkedinUrl }),
        lookingFor,
        ...(companyName && { company }),
    }
}

const filledAnswers = (answers: Record<string, string>) =>
    Object.fromEntries(Object.entries(answers).filter(([, value]) => value))

export function toRsvpRequest(eventId: string, values: RegistrationFormValues): RsvpRequest {
    const { ticketTypeId, name, email, phone, answers, marketingConsent } = values
    return {
        eventId,
        items: [{ ticketTypeId, quantity: 1 }],
        buyer: { name, email, phone },
        answers: filledAnswers(answers),
        profile: toProfile(values),
        marketingConsent,
        termsAccepted: true,
    }
}

export function toApplicationRequest(eventId: string, values: RegistrationFormValues): ApplicationRequest {
    const { ticketTypeId, name, email, phone, answers, marketingConsent } = values
    return {
        eventId,
        ticketTypeId,
        applicant: { name, email, phone },
        answers: filledAnswers(answers),
        profile: toProfile(values),
        marketingConsent,
        termsAccepted: true,
    }
}
