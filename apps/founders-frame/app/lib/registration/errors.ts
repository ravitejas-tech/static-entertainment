import { REGISTRATION_ERRORS } from '~/data/registration/errors'
import type { RegistrationErrorCode } from '~/types/registration'

const isKnownError = (code: string): code is RegistrationErrorCode => Object.hasOwn(REGISTRATION_ERRORS, code)

export function registrationErrorCode(error: unknown): RegistrationErrorCode {
    const code = error instanceof Error ? error.message : ''
    return isKnownError(code) ? code : 'unknown'
}

export const registrationErrorMessage = (error: unknown) => REGISTRATION_ERRORS[registrationErrorCode(error)]
