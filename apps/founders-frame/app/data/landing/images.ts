import { landingPhoto } from '~/lib/media'
import type { MemberType } from '~/types/members'
import type { ResponsivePhoto } from '~/types/media'

export const GATHERING_PHOTO = landingPhoto(
    'hero-desktop',
    'wide',
    'Founders and investors talking around high tables at an evening gathering in Pune',
)

export const HERO_COLLAGE = {
    speaker: landingPhoto('hero-fireside', 'portrait', 'A founder speaking from an armchair at a fireside chat'),
    notes: landingPhoto('hero-notes', 'portrait', 'Two founders sketching a flowchart over coffee'),
    room: landingPhoto('hero-roundtable', 'wide', 'Founders and investors in conversation around a long table'),
} as const

export const CONVERSATION_PHOTO = landingPhoto(
    'statement-roundtable',
    'wide',
    'A small roundtable mid-conversation, with notebooks and coffee on a wooden table',
)

export const AUDIENCE_PHOTOS: Record<MemberType, ResponsivePhoto> = {
    founder: landingPhoto('aud-founders-seat', 'seat', 'Two co-founders sketching a plan on a glass wall'),
    business_leader: landingPhoto(
        'aud-leaders-seat',
        'seat',
        'A business leader talking with a small circle of professionals',
    ),
    investor: landingPhoto('aud-investors-seat', 'seat', 'An investor listening to a founder over coffee'),
    professional: landingPhoto(
        'aud-professionals-seat',
        'seat',
        'Two professionals exchanging contacts at an evening event',
    ),
    student: landingPhoto('aud-students-seat', 'seat', 'Students discussing an idea around a table'),
    ecosystem_partner: landingPhoto('aud-partners-seat', 'seat', 'A mentor guiding three founders around a laptop'),
}

export const FORMAT_PHOTOS = {
    mixer: landingPhoto('format-mixer', 'wide', 'A founder mixer on a Pune rooftop at dusk'),
    roundtable: landingPhoto('format-roundtable', 'wide', 'Founders and investors in a moderated roundtable'),
} as const

export const JOURNEY_PHOTOS = {
    stage: CONVERSATION_PHOTO,
    event: FORMAT_PHOTOS.mixer,
    room: GATHERING_PHOTO,
} as const

export const CTA_PHOTO = landingPhoto(
    'cta-room',
    'wide',
    'An empty venue set up with chairs in a circle before guests arrive',
)
