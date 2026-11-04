import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { applicationPath, PATHS } from '~/data/navigation'
import { REGISTRATION_PAGE } from '~/data/registration/page'

const { submitted } = REGISTRATION_PAGE

export function ApplicationSubmitted({ accessToken }: { accessToken: string }) {
    return (
        <div
            role='status'
            className='space-y-4 py-6'>
            <Text
                as='h2'
                variant='heading'>
                {submitted.title}
            </Text>
            <Text
                variant='lead'
                tone='secondary'>
                {submitted.body}
            </Text>
            <Text tone='secondary'>{submitted.note}</Text>
            <div className='grid gap-3 pt-2 sm:flex'>
                <Button asChild>
                    <Link to={applicationPath(accessToken)}>{submitted.view}</Link>
                </Button>
                <Button
                    asChild
                    variant='secondary'>
                    <Link to={PATHS.events}>{submitted.more}</Link>
                </Button>
            </div>
        </div>
    )
}
