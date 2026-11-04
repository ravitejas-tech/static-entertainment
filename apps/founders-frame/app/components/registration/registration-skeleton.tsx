import { Container } from '~/components/ui/container'
import { Skeleton } from '~/components/ui/skeleton'

export function RegistrationSkeleton() {
    return (
        <Container className='space-y-8 py-10 md:py-14'>
            <Skeleton className='h-5 w-28' />
            <div className='grid gap-10 lg:grid-cols-12'>
                <div className='space-y-6 lg:col-span-7'>
                    <Skeleton className='h-12 w-3/4' />
                    <Skeleton className='h-6 w-full' />
                    <Skeleton className='h-80 w-full' />
                </div>
                <Skeleton className='h-48 lg:col-span-5' />
            </div>
        </Container>
    )
}
