import { Container } from '~/components/ui/container'
import { Skeleton } from '~/components/ui/skeleton'

export function EventPageSkeleton() {
    return (
        <div>
            <Skeleton className='h-130 w-full rounded-none lg:h-150' />
            <Container className='grid gap-12 pb-16 lg:grid-cols-12'>
                <div className='space-y-6 lg:col-span-7 lg:pt-18'>
                    <Skeleton className='h-8 w-56' />
                    <Skeleton className='h-24 w-full' />
                    <Skeleton className='h-32 w-full' />
                </div>
                <Skeleton className='order-first -mt-10 h-96 rounded-2xl lg:order-none lg:col-span-5 lg:-mt-60' />
            </Container>
        </div>
    )
}
