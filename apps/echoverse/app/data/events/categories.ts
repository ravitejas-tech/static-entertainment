export const EVENT_CATEGORIES = {
    dance_night: { label: 'Dance night', plural: 'Dance nights' },
    social_mixer: { label: 'Social mixer', plural: 'Social mixers' },
    workshop: { label: 'Workshop', plural: 'Workshops' },
    weekend_trip: { label: 'Weekend trip', plural: 'Weekend trips' },
    nightlife: { label: 'Nightlife', plural: 'Nightlife' },
    meetup: { label: 'Meetup', plural: 'Meetups' },
} as const satisfies Record<string, { label: string; plural: string }>

export const FALLBACK_CATEGORY = 'meetup'
