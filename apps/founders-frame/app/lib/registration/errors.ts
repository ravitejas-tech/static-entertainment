import { REGISTRATION_ERRORS } from '~/data/registration/errors'

const isKnownError = (code: string): code is keyof typeof REGISTRATION_ERRORS =>
    Object.hasOwn(REGISTRATION_ERRORS, code)

export function registrationErrorMessage({ message }: Error) {
    return REGISTRATION_ERRORS[isKnownError(message) ? message : 'unknown']
}
