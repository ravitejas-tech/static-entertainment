import { z } from 'zod'

export const functionErrorSchema = z.object({ error: z.object({ code: z.string() }) })

export const createOrderResultSchema = z.object({
    order: z.object({ accessToken: z.string(), bookingCode: z.string() }),
    payment: z.object({ provider: z.string() }),
})

export const submitApplicationResultSchema = z.object({
    application: z.object({ accessToken: z.string(), status: z.string() }),
})

export const confirmApplicationResultSchema = z.object({
    order: z.object({ accessToken: z.string(), bookingCode: z.string() }),
})
