export interface MemberProfileInput {
    memberType: string
    jobTitle?: string
    linkedinUrl?: string
    lookingFor?: string[]
    company?: { name?: string; website?: string; industry?: string; stage?: string }
}

export const toProfileJson = ({ memberType, jobTitle, linkedinUrl, lookingFor, company }: MemberProfileInput) => ({
    member_type: memberType,
    job_title: jobTitle ?? '',
    linkedin_url: linkedinUrl ?? null,
    looking_for: lookingFor ?? [],
    ...(company && { company }),
})
