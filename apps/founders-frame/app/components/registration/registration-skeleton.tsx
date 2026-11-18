import { Container } from '~/components/ui/container'
import { Skeleton } from '~/components/ui/skeleton'

export function RegistrationSkeleton() {
    return (
        <div>
            <Skeleton className='h-96 w-full rounded-none lg:h-110' />
            <Container className='grid gap-12 pb-16 lg:grid-cols-12'>
                <div className='space-y-6 pt-10 lg:col-span-7 lg:pt-14'>
                    <Skeleton className='h-8 w-56' />
                    <Skeleton className='h-24 w-full' />
                    <Skeleton className='h-24 w-full' />
                    <Skeleton className='h-48 w-full' />
                </div>
                <Skeleton className='hidden h-150 rounded-2xl lg:col-span-5 lg:-mt-52 lg:block' />
            </Container>
        </div>
    )
}
