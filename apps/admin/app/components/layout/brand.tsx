import { Link } from 'react-router'
import { Logo } from '~/components/ui/logo'
import { AUTH_PATHS } from '~/data/auth/session'

export function Brand() {
    return (
        <Link
            to={AUTH_PATHS.home}
            className='flex min-w-0 items-center'>
            <Logo />
        </Link>
    )
}
