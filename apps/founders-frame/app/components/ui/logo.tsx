import { BrandEmblem } from '~/components/ui/brand-emblem'
import { BRAND_LOGO, BRAND_NAME } from '~/data/brand'

export function Logo() {
    return (
        <span className='flex items-center gap-2.5'>
            <BrandEmblem />
            <img
                {...BRAND_LOGO.wordmark}
                alt={BRAND_NAME}
                className='h-7 w-auto sm:h-8'
            />
        </span>
    )
}
