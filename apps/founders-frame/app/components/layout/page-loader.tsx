import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { LOADING_LABEL } from '~/data/layout/loading'

export function PageLoader() {
    return (
        <div
            role='status'
            className='grid min-h-screen place-items-center'>
            <div className='flex items-center gap-3 text-accent-text'>
                <Spinner />
                <Text
                    as='span'
                    variant='label'
                    tone='secondary'>
                    {LOADING_LABEL}
                </Text>
            </div>
        </div>
    )
}
