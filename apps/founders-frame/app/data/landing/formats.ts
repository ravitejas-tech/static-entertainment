import { FORMAT_PHOTOS } from '~/data/landing/images'
import type { FormatFeature, FormatStory } from '~/types/landing'

export const FORMATS_HEADING = {
    eyebrow: 'How events work',
    title: 'Different gatherings for different conversations.',
    lead: 'Not every event has the same purpose, so each one is run the way that serves the room best.',
} as const

export const FORMAT_AVAILABILITY = { now: 'Open now', later: 'Coming later' } as const

export const FORMAT_FEATURES: FormatFeature[] = [
    {
        title: 'Free community events',
        tone: 'gold',
        photo: FORMAT_PHOTOS.mixer,
        steps: ['RSVP', 'Get your QR code', 'Check in', 'Follow up'],
        body: 'Networking meetups, founder mixers and community launches, open to everyone who’s building. Reserve your spot in a minute.',
    },
    {
        title: 'Application-based events',
        tone: 'navy',
        photo: FORMAT_PHOTOS.roundtable,
        steps: ['Apply', 'Review', 'Confirm', 'Check in'],
        body: 'Founder roundtables, investor networking and leadership circles, where the right mix matters. Our team reads every application.',
    },
]

export const FORMATS_LATER: FormatStory[] = [
    {
        title: 'Paid events',
        tone: 'sand',
        steps: ['Register', 'Pay', 'Get your ticket', 'Check in'],
        body: 'Premium workshops, masterclasses and conferences.',
    },
    {
        title: 'Cohorts and memberships',
        tone: 'lavender',
        steps: ['Apply', 'Get accepted', 'Join', 'Meet regularly'],
        body: 'Founder programmes and mentorship circles for long-term growth.',
    },
]
