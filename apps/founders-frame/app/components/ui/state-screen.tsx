import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { EmptyState } from '~/components/ui/empty-state'

export interface StateScreenProps {
    title: string
    body: string
    actionLabel: string
    actionTo: string
}

export function StateScreen({ title, body, actionLabel, actionTo }: StateScreenProps) {
    return (
        <Container className='py-16 md:py-24'>
            <EmptyState
                level='h1'
                title={title}
                body={body}
                action={
                    <Button
                        asChild
                        variant='secondary'>
                        <Link to={actionTo}>{actionLabel}</Link>
                    </Button>
                }
            />
        </Container>
    )
}
