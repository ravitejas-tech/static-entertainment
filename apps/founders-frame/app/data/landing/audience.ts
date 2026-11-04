import { BriefcaseBusiness, Building2, ChartNoAxesCombined, GraduationCap, Landmark, UsersRound } from 'lucide-react'
import type { AudienceGroup } from '~/types/landing'

export const AUDIENCE_HEADING = {
    eyebrow: 'Who’s in the room',
    title: 'A room built on the right mix of people.',
    lead: 'Founders Frame brings together the whole startup and business ecosystem, so you meet collaborators, mentors, clients, investors and co-founders in one place.',
} as const

export const AUDIENCE_GROUPS: AudienceGroup[] = [
    {
        type: 'founder',
        icon: BriefcaseBusiness,
        title: 'Founders and entrepreneurs',
        body: 'Startup founders, co-founders, business owners and early-stage builders.',
    },
    {
        type: 'business_leader',
        icon: Building2,
        title: 'Business leaders',
        body: 'CEOs, CXOs and other decision-makers who shape how companies grow.',
    },
    {
        type: 'investor',
        icon: ChartNoAxesCombined,
        title: 'Investors',
        body: 'Angel investors, venture capitalists, investment firms and family offices.',
    },
    {
        type: 'professional',
        icon: UsersRound,
        title: 'Professionals',
        body: 'HR leaders, marketers, sales professionals, consultants and strategists.',
    },
    {
        type: 'student',
        icon: GraduationCap,
        title: 'Students and aspiring founders',
        body: 'College students and anyone exploring a startup idea.',
    },
    {
        type: 'ecosystem_partner',
        icon: Landmark,
        title: 'Ecosystem partners',
        body: 'Colleges, incubators, accelerators, mentors, advisors and service providers.',
    },
]
