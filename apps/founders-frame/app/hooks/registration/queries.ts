import { createQuery } from 'react-query-kit'
import { quotePromo } from '~/services/registration'
import type { PromoQuoteInput } from '~/types/registration'

export const usePromoQuote = createQuery({
    queryKey: ['registration', 'promo-quote'],
    fetcher: (input: PromoQuoteInput) => quotePromo(input),
    retry: false,
})
