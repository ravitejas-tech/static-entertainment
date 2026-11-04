import type { Option } from '~/types/options'

export function toOptions<T extends string>(labels: Record<T, string>): Option<T>[] {
    return (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }))
}

export function isOneOf<T extends string>(values: readonly T[], value: string): value is T {
    return (values as readonly string[]).includes(value)
}

export function labelsOf<T extends string>(
    values: readonly string[],
    allowed: readonly T[],
    labels: Record<T, string>,
) {
    return values.filter((value): value is T => isOneOf(allowed, value)).map((value) => labels[value])
}
