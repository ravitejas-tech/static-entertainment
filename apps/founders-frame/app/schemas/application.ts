import { z } from 'zod'
import { Constants } from '~/types/database'

export const applicationSchema = z.object({
    community: z.string(),
    status: z.enum(Constants.public.Enums.application_status),
    name: z.string(),
    email: z.string(),
    created_at: z.string(),
    ticket_type: z.string(),
    event: z.object({
        slug: z.string(),
        title: z.string(),
        starts_at: z.string(),
        ends_at: z.string(),
        city: z.string(),
        venue_name: z.string(),
        venue_address: z.string(),
        cover_url: z.string().nullable(),
        cover_alt: z.string(),
    }),
    ticket_access_token: z.string().nullable(),
})
