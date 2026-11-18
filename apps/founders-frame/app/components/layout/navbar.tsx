import { Link, useLocation } from 'react-router'
import { MobileMenu } from '~/components/layout/mobile-menu'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { NAV_LABELS } from '~/data/layout/landmarks'
import { NAV_LINKS, PATHS, PRIMARY_CTA_LABEL } from '~/data/navigation'
import { cn } from '~/lib/utils'

export function Navbar() {
    const overHero = useLocation().pathname === PATHS.home

    return (
        <header
            className={cn(
                'sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md',
                overHero && 'animate-nav-solid',
            )}>
            <Container className='relative flex h-16 items-center justify-between gap-4 sm:h-18'>
                <Link
                    to={PATHS.home}
                    className='rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'>
                    <Logo />
                </Link>
                <nav
                    aria-label={NAV_LABELS.primary}
                    className='hidden items-center gap-6 lg:flex'>
                    {NAV_LINKS.map(({ label, to }) => (
                        <AnchorLink
                            key={to}
                            to={to}
                            layout='nav'>
                            {label}
                        </AnchorLink>
                    ))}
                </nav>
                <div className='flex items-center gap-3'>
                    <Button
                        asChild
                        size='sm'
                        className='hidden sm:inline-flex'>
                        <Link to={PATHS.events}>{PRIMARY_CTA_LABEL}</Link>
                    </Button>
                    <MobileMenu />
                </div>
            </Container>
        </header>
    )
}
