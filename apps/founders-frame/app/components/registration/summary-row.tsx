import { Text, type TextTone, type TextVariant } from '~/components/ui/text'

export interface SummaryRowProps {
    label: string
    value: string
    variant?: TextVariant
    tone?: TextTone
}

export function SummaryRow({ label, value, variant = 'body', tone = 'secondary' }: SummaryRowProps) {
    return (
        <div className='flex items-baseline justify-between gap-4'>
            <Text
                as='dt'
                variant={variant}
                tone={tone}>
                {label}
            </Text>
            <Text
                as='dd'
                variant={variant}
                className='shrink-0 tabular-nums'>
                {value}
            </Text>
        </div>
    )
}
