import type { FOUNDER_STAGES, INDUSTRIES, LOOKING_FOR } from '~/data/members/options'
import type { Enums } from '~/types/database'

export type MemberType = Enums<'member_type'>

export type FounderStage = (typeof FOUNDER_STAGES)[number]

export type Industry = (typeof INDUSTRIES)[number]

export type LookingFor = (typeof LOOKING_FOR)[number]
