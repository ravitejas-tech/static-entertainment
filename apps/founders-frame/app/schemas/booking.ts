import { z } from 'zod'
import { Constants } from '~/types/database'

const { order_status, ticket_status } = Constants.public.Enums

export const bookingSchema = z.object({
    community: z.object({ slug: z.string(), name: z.string() }),
    order: z.object({
        id: z.string(),
        booking_code: z.string(),
        status: z.enum(order_status),
        name: z.string(),
        email: z.string(),
        total: z.number(),
    }),
    event: z.object({
        slug: z.string(),
        title: z.string(),
        starts_at: z.string(),
        ends_at: z.string(),
        city: z.string(),
        venue_name: z.string(),
        venue_address: z.string(),
        venue_lat: z.number().nullable(),
        venue_lng: z.number().nullable(),
        map_url: z.string().nullable(),
        things_to_know: z.array(z.string()).catch([]),
    }),
    tickets: z.array(
        z.object({
            code: z.string(),
            qr_token: z.string(),
            status: z.enum(ticket_status),
            checked_in_at: z.string().nullable(),
            ticket_type: z.string(),
        }),
    ),
})
