import type { Enums } from '~/types/database'

export const EVENT_STATUS_LABELS: Record<Enums<'event_status'>, string> = {
    draft: 'Draft',
    published: 'Published',
}

export const TONE_LABELS: Record<Enums<'pop_tone'>, string> = {
    pink: 'Pink',
    yellow: 'Yellow',
    cyan: 'Cyan',
    lime: 'Lime',
    violet: 'Violet',
    orange: 'Orange',
}

export const TONE_OPTIONS = Object.entries(TONE_LABELS).map(([value, label]) => ({
    value: value as Enums<'pop_tone'>,
    label,
}))
