import { Text } from '~/components/ui/text'

export interface Fact {
    label: string
    value: string
}

export function FactList({ facts }: { facts: Fact[] }) {
    return (
        <dl className='grid gap-4 border-t border-border pt-4 sm:grid-cols-2'>
            {facts.map(({ label, value }) => (
                <div
                    key={label}
                    className='space-y-1'>
                    <Text
                        as='dt'
                        variant='small'
                        tone='muted'>
                        {label}
                    </Text>
                    <Text
                        as='dd'
                        variant='label'>
                        {value}
                    </Text>
                </div>
            ))}
        </dl>
    )
}
