import { AnchorLink } from '~/components/ui/anchor-link'
import { Container } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { Text } from '~/components/ui/text'
import { FOOTER_COPY, FOOTER_LINKS } from '~/data/layout/footer'
import { NAV_LABELS } from '~/data/layout/landmarks'

export function Footer() {
    return (
        <footer className='border-t border-border bg-surface-muted'>
            <Container className='grid gap-10 py-12 md:grid-cols-3 md:py-16'>
                <div className='space-y-4 md:col-span-2'>
                    <Logo />
                    <Text
                        tone='secondary'
                        className='max-w-md'>
                        {FOOTER_COPY.blurb}
                    </Text>
                </div>
                <nav
                    aria-label={NAV_LABELS.footer}
                    className='space-y-2'>
                    <Text variant='meta'>{FOOTER_COPY.linksTitle}</Text>
                    <ul className='flex flex-col'>
                        {FOOTER_LINKS.map(({ label, to }) => (
                            <li key={to}>
                                <AnchorLink
                                    to={to}
                                    layout='list'>
                                    {label}
                                </AnchorLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
            <Container className='flex flex-col gap-1 border-t border-border py-6 sm:flex-row sm:justify-between'>
                <Text
                    variant='small'
                    tone='muted'>
                    {FOOTER_COPY.place}
                </Text>
                <Text
                    variant='small'
                    tone='muted'>
                    {FOOTER_COPY.platform}
                </Text>
            </Container>
        </footer>
    )
}
