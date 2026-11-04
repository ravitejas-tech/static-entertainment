import type { LucideIcon } from 'lucide-react'
import type { BadgeTone } from '~/components/ui/badge'
import type { ResponsivePhoto } from '~/types/media'
import type { MemberType } from '~/types/members'

export interface AudienceGroup {
    type: MemberType
    icon: LucideIcon
    title: string
    body: string
}

export interface FormatFeature extends FormatStory {
    photo: ResponsivePhoto
}

export interface FormatStory {
    title: string
    tone: BadgeTone
    steps: string[]
    body: string
}
