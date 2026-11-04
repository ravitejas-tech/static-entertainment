import { createQuery } from 'react-query-kit'
import { getApplication } from '~/services/applications'

export const useApplication = createQuery({
    queryKey: ['application'],
    fetcher: (accessToken: string) => getApplication(accessToken),
})
