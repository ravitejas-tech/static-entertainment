import { Constants } from '~/types/database'
import type { FounderStage, Industry, MemberType } from '~/types/members'

export const MEMBER_TYPES = Constants.public.Enums.member_type

export const MEMBER_TYPE_LABELS: Record<MemberType, string> = {
    founder: 'Founder',
    business_leader: 'Business leader',
    investor: 'Investor',
    professional: 'Professional',
    student: 'Student',
    ecosystem_partner: 'Ecosystem partner',
}

export const MEMBER_GROUP_LABELS: Record<MemberType, string> = {
    founder: 'Founders',
    business_leader: 'Business leaders',
    investor: 'Investors',
    professional: 'Professionals',
    student: 'Students',
    ecosystem_partner: 'Ecosystem partners',
}

export const FOUNDER_STAGES = ['idea', 'mvp', 'early_revenue', 'growth', 'scale'] as const

export const FOUNDER_STAGE_LABELS: Record<FounderStage, string> = {
    idea: 'Idea',
    mvp: 'Building the MVP',
    early_revenue: 'Early revenue',
    growth: 'Growth',
    scale: 'Scaling',
}

export const INDUSTRIES = [
    'saas',
    'fintech',
    'd2c',
    'ai',
    'healthtech',
    'edtech',
    'deeptech',
    'climate',
    'manufacturing',
    'services',
    'other',
] as const

export const INDUSTRY_LABELS: Record<Industry, string> = {
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
