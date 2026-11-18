import type { Enums } from '~/types/database'

export const MEMBER_TYPE_LABELS: Record<Enums<'member_type'>, string> = {
    founder: 'Founder',
    business_leader: 'Business leader',
    investor: 'Investor',
    professional: 'Professional',
    student: 'Student',
    ecosystem_partner: 'Ecosystem partner',
}

export const FOUNDER_STAGE_LABELS: Partial<Record<string, string>> = {
    idea: 'Idea',
    mvp: 'Building the MVP',
    early_revenue: 'Early revenue',
    growth: 'Growth',
    scale: 'Scaling',
}

export const INDUSTRY_LABELS: Partial<Record<string, string>> = {
    saas: 'SaaS',
    fintech: 'Fintech',
    d2c: 'D2C and consumer',
    ai: 'AI and data',
    healthtech: 'Healthtech',
    edtech: 'Edtech',
    deeptech: 'Deeptech and hardware',
    climate: 'Climate and energy',
    manufacturing: 'Manufacturing',
    services: 'Services and agencies',
    other: 'Other',
}

export const LOOKING_FOR_LABELS: Partial<Record<string, string>> = {
    co_founder: 'A co-founder',
    investors: 'Investors',
    customers: 'Customers',
    mentors: 'Mentors',
    talent: 'Talent',
    partners: 'Partners',
    peers: 'Founder peers',
}

export const HOST_PART_LABELS: Partial<Record<string, string>> = {
    host: 'Host',
    speaker: 'Speaker',
    moderator: 'Moderator',
}
