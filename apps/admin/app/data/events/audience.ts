import { FOUNDER_STAGE_LABELS, HOST_PART_LABELS, INDUSTRY_LABELS, MEMBER_TYPE_LABELS } from '~/data/members/options'
import { labelOptions } from '~/lib/members'
import type { ListItemField } from '~/types/events'

export const AUDIENCE_FIELDS = [
    {
        name: 'audience',
        label: 'Who it is for',
        hint: 'Pick everyone this event is meant for.',
        options: labelOptions(MEMBER_TYPE_LABELS),
    },
    {
        name: 'industries',
        label: 'Industries',
        hint: 'Optional. Leave empty if any industry is welcome.',
        options: labelOptions(INDUSTRY_LABELS),
    },
    {
        name: 'founder_stages',
        label: 'Founder stages',
        hint: 'Optional. Leave empty if every stage is welcome.',
        options: labelOptions(FOUNDER_STAGE_LABELS),
    },
] as const

export const SPEAKER_FIELDS: readonly ListItemField[] = [
    { key: 'name', label: 'Name', placeholder: 'Ananya Rao' },
    { key: 'role', label: 'Title and company', placeholder: 'Founder, Acme' },
    { key: 'part', label: 'Part', placeholder: 'Pick a part', options: labelOptions(HOST_PART_LABELS) },
]
