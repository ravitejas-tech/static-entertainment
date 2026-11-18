import type { z } from 'zod'
import type { bookingSchema } from '~/schemas/booking'

export type Booking = z.infer<typeof bookingSchema>

export type BookingTicket = Booking['tickets'][number]
