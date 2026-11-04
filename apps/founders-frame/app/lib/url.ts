import { URL_SCHEME } from '~/data/registration/limits'

export function withScheme(value: string) {
    return value && !/^https?:\/\//i.test(value) ? `${URL_SCHEME}${value}` : value
}

export function isWebUrl(value: string) {
    try {
        return ['http:', 'https:'].includes(new URL(value).protocol)
    } catch {
        return false
    }
}
