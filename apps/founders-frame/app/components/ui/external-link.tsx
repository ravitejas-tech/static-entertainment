import { Text } from '~/components/ui/text'

export interface ExternalLinkProps {
    href: string
    children: string
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
    return (
        <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex rounded-md text-accent-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'>
            <Text
                as='span'
                variant='label'
                tone='inherit'>
                {children}
            </Text>
        </a>
    )
}
