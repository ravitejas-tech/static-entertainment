import { Text } from '~/components/ui/text'
import { ADMIN_BRAND } from '~/data/brand'

export function Logo() {
    return (
        <span className='flex min-w-0 items-center gap-3'>
            <Text
                as='span'
                variant='title'
                tone='inherit'
                aria-hidden
                className='grid size-10 shrink-0 place-items-center rounded-xl bg-text-primary text-bg'>
                {ADMIN_BRAND.monogram}
            </Text>
            <span className='min-w-0'>
                <Text
                    as='span'
                    variant='label'
                    className='block truncate'>
                    {ADMIN_BRAND.name}
                </Text>
                <Text
                    as='span'
                    variant='meta'
                    className='block'>
                    {ADMIN_BRAND.product}
                </Text>
            </span>
        </span>
    )
}
