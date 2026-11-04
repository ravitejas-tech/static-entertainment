import type { LucideIcon } from 'lucide-react'
import type { MemberType } from '~/types/members'

export interface AudienceGroup {
    type: MemberType
    name: string
    title: string
    body: string
}

export interface JourneyStep {
    short: string
    title: string
    body: string
}

export interface JourneyLine {
    name: string
    price: number
    quantity: number
}

export interface JourneyPayMethod {
    label: string
    icon: LucideIcon
}
