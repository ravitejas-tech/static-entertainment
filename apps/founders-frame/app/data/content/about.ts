import { PATHS } from '~/data/navigation'
import type { Belief } from '~/types/content'

export const ABOUT_PAGE = {
    title: 'About · Founders Frame',
    description:
        'Founders Frame is a curated networking and business community for Pune’s founders, investors, business leaders, professionals and aspiring founders.',
    path: PATHS.about,
} as const

export const ABOUT_INTRO = {
    eyebrow: 'About',
    title: 'A considered frame. A room full of possibility.',
    paragraphs: [
        'Founders Frame is Pune’s curated business and founder community. It brings together founders, entrepreneurs, investors, business leaders, professionals, students and ecosystem partners.',
        'Every meaningful business journey starts with a conversation. Sometimes that conversation changes a decision, introduces a new perspective or brings the right people together at the right time. Founders Frame creates the setting for those conversations.',
        'The goal is not to collect contacts. It is to build relationships that move people forward.',
    ],
    quote: 'Events are one of the ways we build the community. The relationships that form between them matter more.',
    lookingForTitle: 'What members come for',
    lookingFor: [
        'Collaborators',
        'Mentors',
        'Potential clients',
        'Investors',
        'Co-founders',
        'Lasting professional relationships',
    ],
} as const

export const BELIEFS_HEADING = {
    eyebrow: 'What we believe',
    title: 'How the community is run.',
} as const

export const BELIEFS: Belief[] = [
    {
        title: 'Community first',
        body: 'The relationships that form between events matter more than any single event.',
    },
    {
        title: 'Curated, not crowded',
        body: 'The right people in the room beat a big room. That is why many gatherings are application-based.',
    },
    {
        title: 'Value before price',
        body: 'We start free, and introduce paid events and memberships only once the community has built real value.',
    },
    {
        title: 'Built to grow',
        body: 'New formats, from cohorts to memberships, can join the community without starting over.',
    },
]

export const BELIEFS_SECTION_ID = 'what-we-believe'
