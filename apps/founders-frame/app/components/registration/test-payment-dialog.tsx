import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { TEST_PAYMENT_TITLE_ID } from '~/data/registration/page'
import { TEST_PAYMENT_COPY } from '~/data/registration/payment'
import { formatRupees } from '~/lib/format'

export interface TestPaymentDialogProps {
    open: boolean
    total: number
    paying: boolean
    onPay: () => void
    onClose: () => void
}

export function TestPaymentDialog({ open, total, paying, onPay, onClose }: TestPaymentDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            labelledBy={TEST_PAYMENT_TITLE_ID}
            dismissible={!paying}>
            <div className='space-y-5 p-6 pb-10 sm:pb-6'>
                <Badge tone='gold'>{TEST_PAYMENT_COPY.badge}</Badge>
                <div className='space-y-2'>
                    <Text
                        as='h2'
                        id={TEST_PAYMENT_TITLE_ID}
                        variant='heading'>
                        {TEST_PAYMENT_COPY.title}
                    </Text>
                    <Text
                        variant='small'
                        tone='secondary'>
                        {TEST_PAYMENT_COPY.body}
                    </Text>
                </div>
                <div className='grid gap-3'>
                    <Button
                        type='button'
                        onClick={onPay}
                        disabled={paying}
                        aria-busy={paying}>
                        {paying && <Spinner />}
                        {TEST_PAYMENT_COPY.pay(formatRupees(total))}
                    </Button>
                    <Button
                        type='button'
                        variant='secondary'
                        onClick={onClose}
                        disabled={paying}>
                        {TEST_PAYMENT_COPY.cancel}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}
