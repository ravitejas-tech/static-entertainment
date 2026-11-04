import type { HTMLAttributes, HTMLInputTypeAttribute } from 'react'
import type { z } from 'zod'
import type { REGISTRATION_PAGE } from '~/data/registration/page'
import type { buildRegistrationSchema } from '~/schemas/registration'
import type { LookingFor, MemberType } from '~/types/members'

export type RegistrationMode = 'rsvp' | 'apply'

export interface QuestionInputConfig {
    autoComplete: string
    type?: HTMLInputTypeAttribute
    inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
    options?: readonly string[]
    multiline?: boolean
}

export interface Person {
    name: string
    email: string
    phone: string
}

export interface MemberProfileInput {
    memberType: MemberType
    jobTitle?: string
    linkedinUrl?: string
    lookingFor?: LookingFor[]
    company?: { name?: string; website?: string; industry?: string; stage?: string }
}

interface RegistrationBase {
    eventId: string
    answers: Record<string, string>
    profile: MemberProfileInput
    marketingConsent: boolean
    termsAccepted: true
}

export interface RsvpRequest extends RegistrationBase {
    items: { ticketTypeId: string; quantity: number }[]
    buyer: Person
}

export interface ApplicationRequest extends RegistrationBase {
    ticketTypeId: string
    applicant: Person
}

type RegistrationSchema = ReturnType<typeof buildRegistrationSchema>

export type RegistrationFormInput = z.input<RegistrationSchema>

export type RegistrationFormValues = z.output<RegistrationSchema>

export type BlockedReason = keyof (typeof REGISTRATION_PAGE)['blocked']
