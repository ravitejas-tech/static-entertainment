import type { AudienceGroup } from '~/types/landing'

export const AUDIENCE_HEADING = {
    eyebrow: 'Who’s in the room',
    title: 'A room built on the right mix of people.',
    lead: 'Founders Frame brings together the whole startup and business ecosystem, so you meet collaborators, mentors, clients, investors and co-founders in one place.',
} as const

const seatNumber = (position: number) => String(position).padStart(2, '0')

export const AUDIENCE_TABLE = {
    hint: 'Hover or tap a seat to stop the table on it.',
    seat: (position: number) => `Seat ${seatNumber(position)}`,
    seatOf: (position: number, total: number) => `Seat ${seatNumber(position)} / ${seatNumber(total)}`,
} as const

export const AUDIENCE_GROUPS: AudienceGroup[] = [
    {
        type: 'founder',
        name: 'Founders',
        title: 'Founders and entrepreneurs',
        body: 'Startup founders, co-founders, business owners and early-stage builders.',
    },
    {
        type: 'investor',
        name: 'Investors',
        title: 'Investors',
        body: 'Angel investors, venture capitalists, investment firms and family offices.',
    },
    {
        type: 'business_leader',
        name: 'Leaders',
        title: 'Business leaders',
        body: 'CEOs, CXOs and other decision-makers who shape how companies grow.',
    },
    {
        type: 'ecosystem_partner',
        name: 'Partners',
        title: 'Ecosystem partners',
        body: 'Colleges, incubators, accelerators, mentors, advisors and service providers.',
    },
    {
        type: 'student',
        name: 'Students',
        title: 'Students and aspiring founders',
        body: 'College students and anyone exploring a startup idea.',
    },
    {
        type: 'professional',
        name: 'Professionals',
        title: 'Professionals',
        body: 'HR leaders, marketers, sales professionals, consultants and strategists.',
    },
]
