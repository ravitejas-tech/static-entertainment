import { SummaryRow } from '~/components/registration/summary-row'
import { CHECKOUT_COPY } from '~/data/registration/form'
import { formatRupees } from '~/lib/format'
import type { CartLine } from '~/types/registration'

const { summary } = CHECKOUT_COPY

export interface OrderSummaryProps {
    lines: CartLine[]
    subtotal: number
    discount: number
    promoCode: string | null
    total: number
}

export function OrderSummary({ lines, subtotal, discount, promoCode, total }: OrderSummaryProps) {
    return (
        <dl className='space-y-3'>
            {lines.map(({ option, quantity, amount }) => (
                <SummaryRow
                    key={option.id}
                    label={summary.line(quantity, option.name)}
                    value={formatRupees(amount)}
                />
            ))}
            {promoCode && discount > 0 && (
                <>
                    <SummaryRow
                        label={summary.subtotal}
                        value={formatRupees(subtotal)}
                    />
                    <SummaryRow
                        label={summary.discount(promoCode)}
                        value={`−${formatRupees(discount)}`}
                        tone='success'
                    />
                </>
            )}
            <div className='border-t border-border pt-3'>
                <SummaryRow
                    label={summary.total}
                    value={formatRupees(total)}
                    variant='title'
                    tone='primary'
                />
            </div>
        </dl>
    )
}
