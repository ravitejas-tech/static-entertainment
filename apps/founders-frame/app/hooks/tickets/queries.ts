import { createQuery } from 'react-query-kit'
import { getBooking } from '~/services/tickets'

export const useBooking = createQuery({
    queryKey: ['booking'],
    fetcher: (accessToken: string) => getBooking(accessToken),
})
