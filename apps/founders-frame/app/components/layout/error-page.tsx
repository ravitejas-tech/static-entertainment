import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { Text } from '~/components/ui/text'
import { ERROR_HOME_LABEL } from '~/data/ui/error'
import { PATHS } from '~/data/navigation'

export interface ErrorPageProps {
    title: string
    details: string
    stack?: string
}

export function ErrorPage({ title, details, stack }: ErrorPageProps) {
    return (
        <main className='flex min-h-screen flex-col'>
            <Container className='py-6'>
                <Link
                    to={PATHS.home}
                    className='inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'>
                    <Logo />
                </Link>
            </Container>
            <Container className='grid flex-1 place-items-center py-16'>
                <div className='max-w-2xl space-y-5 text-center'>
                    <Text
                        as='h1'
                        variant='display'>
                        {title}
                    </Text>
                    <Text
                        variant='lead'
                        tone='secondary'>
                        {details}
                    </Text>
                    <Button asChild>
                        <Link to={PATHS.events}>{ERROR_HOME_LABEL}</Link>
                    </Button>
                </div>
                {stack && (
                    <pre className='mt-8 w-full overflow-x-auto rounded-lg border border-border bg-surface p-4'>
                        <Text
                            as='span'
                            variant='code'>
                            {stack}
                        </Text>
                    </pre>
                )}
            </Container>
        </main>
    )
}
