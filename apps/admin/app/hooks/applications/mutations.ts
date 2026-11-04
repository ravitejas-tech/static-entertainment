import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { APPLICATIONS_COPY } from '~/data/applications/copy'
import { useApplications } from '~/hooks/applications/queries'
import { refreshEvents } from '~/hooks/events/mutations'
import { functionErrorMessage } from '~/lib/function-errors'
import { reviewApplication } from '~/services/applications'

const { toasts } = APPLICATIONS_COPY

export const useReviewApplication = createMutation({
    mutationFn: reviewApplication,
    onSuccess: ({ emailed }, { name, status }, _result, { client }) => {
        toast.success(toasts.done[status](name))
        if (!emailed) toast.error(toasts.notEmailed)
        return Promise.all([client.invalidateQueries({ queryKey: useApplications.getKey() }), refreshEvents(client)])
    },
    onError: (error) => toast.error(functionErrorMessage(error)),
})
