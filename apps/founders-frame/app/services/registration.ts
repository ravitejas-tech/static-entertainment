import { createOrderResultSchema, verifyPaymentResultSchema } from '~/schemas/functions'
import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import type { OrderRequest, PromoQuoteInput, VerifyPaymentInput } from '~/types/registration'

export const createOrder = (request: OrderRequest) => invokeFunction('create-order', request, createOrderResultSchema)

export const verifyPayment = (input: VerifyPaymentInput) =>
    invokeFunction('verify-payment', input, verifyPaymentResultSchema)

export async function quotePromo({ eventId, code, subtotal }: PromoQuoteInput) {
    const { data, error } = await supabase
        .rpc('quote_promo', { p_event_id: eventId, p_code: code, p_subtotal: subtotal })
        .single()
    if (error) throw new Error(error.message)
    return data
}
