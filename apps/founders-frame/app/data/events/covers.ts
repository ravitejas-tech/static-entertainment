import { CTA_PHOTO, FORMAT_PHOTOS, GATHERING_PHOTO, CONVERSATION_PHOTO } from '~/data/landing/images'
import type { ResponsivePhoto } from '~/types/media'

export const DEFAULT_EVENT_PHOTO = FORMAT_PHOTOS.mixer

export const CATEGORY_PHOTOS: Partial<Record<string, ResponsivePhoto>> = {
    networking_meetup: GATHERING_PHOTO,
    founder_mixer: FORMAT_PHOTOS.mixer,
    roundtable: FORMAT_PHOTOS.roundtable,
    investor_networking: CONVERSATION_PHOTO,
    leadership_circle: FORMAT_PHOTOS.roundtable,
    panel_discussion: FORMAT_PHOTOS.roundtable,
    workshop: CONVERSATION_PHOTO,
    masterclass: CONVERSATION_PHOTO,
    conference: CTA_PHOTO,
}
