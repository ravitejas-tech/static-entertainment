import { Container } from '~/components/ui/container'
import { Skeleton } from '~/components/ui/skeleton'

export function EventPageSkeleton() {
    return (
        <Container className='space-y-10 py-10 md:py-14'>
            <Skeleton className='h-5 w-24' />
            <div className='grid gap-8 lg:grid-cols-2'>
                <div className='space-y-4'>
                    <Skeleton className='h-6 w-32' />
                    <Skeleton className='h-14 w-full' />
                    <Skeleton className='h-6 w-4/5' />
                </div>
                <Skeleton className='aspect-video w-full' />
            </div>
            <div className='grid gap-10 lg:grid-cols-12'>
                <Skeleton className='h-64 lg:col-span-7' />
                <Skeleton className='h-64 lg:col-span-5' />
            </div>
        </Container>
    )
}
