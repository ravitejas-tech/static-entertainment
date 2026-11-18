import { BRAND_LOGO } from '~/data/brand'
import { cn } from '~/lib/utils'

export function BrandEmblem({ className }: { className?: string }) {
    return (
        <img
            {...BRAND_LOGO.emblem}
            alt=''
            className={cn('h-10 w-auto shrink-0', className)}
        />
    )
}
