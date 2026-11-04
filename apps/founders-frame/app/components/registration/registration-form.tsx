import { Timer } from 'lucide-react'
import { FormProvider } from 'react-hook-form'
import { TicketNote } from '~/components/events/ticket-note'
import { CheckoutCard } from '~/components/registration/checkout-card'
import { ConsentFields } from '~/components/registration/consent-fields'
import { OrderSummary } from '~/components/registration/order-summary'
import { PromoField } from '~/components/registration/promo-field'
import { RegistrationSteps } from '~/components/registration/registration-steps'
import { TestPaymentDialog } from '~/components/registration/test-payment-dialog'
import { Button } from '~/components/ui/button'
import { Notice } from '~/components/ui/notice'
import { Reveal } from '~/components/ui/reveal'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { CHECKOUT_COPY, FORM_COPY } from '~/data/registration/form'
import { useCheckout } from '~/hooks/registration/use-checkout'
import { formatEventTime, formatRupees } from '~/lib/format'
import { formSteps } from '~/lib/registration/steps'
import type { EventDetail } from '~/types/events'

export interface RegistrationFormProps {
    event: EventDetail
    seat: string | null
}

export function RegistrationForm({ event, seat }: RegistrationFormProps) {
    const { cart, form, promo, payment, submit, changeQuantity, total } = useCheckout(event, seat)
    const empty = cart.lines.length === 0
    const holdExpiresAt = payment.order?.holdExpiresAt ?? null

    return (
        <FormProvider {...form}>
            <form
                noValidate
                onSubmit={submit}
                className='grid gap-12 lg:grid-cols-12'>
                <div className='pt-10 lg:col-span-7 lg:pt-14 2xl:col-span-8'>
                    <RegistrationSteps
                        event={event}
                        quantityOf={cart.quantityOf}
                        canAdd={cart.canAdd}
                        onChange={changeQuantity}
                    />
                </div>
                <aside className='relative z-10 lg:sticky lg:top-24 lg:col-span-5 lg:-mt-52 lg:self-start 2xl:col-span-4'>
                    <Reveal
                        trigger='load-lg'
                        effect='lift'
                        order={2}>
                        <CheckoutCard
                            step={formSteps(event.questions.length).length + 1}
                            title={FORM_COPY.sections.payment.title}>
                            <div className='rounded-xl bg-bg p-4'>
                                {empty ? (
                                    <Text tone='secondary'>{CHECKOUT_COPY.tickets.empty}</Text>
                                ) : (
                                    <OrderSummary
                                        lines={cart.lines}
                                        subtotal={cart.subtotal}
                                        discount={promo.discount}
                                        promoCode={promo.applied?.code ?? null}
                                        total={total}
                                    />
                                )}
                            </div>
                            <PromoField
                                applied={promo.applied?.code ?? null}
                                checking={promo.checking}
                                error={promo.error}
                                onApply={promo.apply}
                                onRemove={promo.remove}
                            />
                            <ConsentFields />
                            {holdExpiresAt && (
                                <Notice
                                    icon={Timer}
                                    tone='warning'
                                    title={CHECKOUT_COPY.hold(formatEventTime(holdExpiresAt))}
                                />
                            )}
                            <Button
                                type='submit'
                                disabled={payment.busy || empty}
                                aria-busy={payment.busy}
                                className='w-full'>
                                {payment.busy && <Spinner />}
                                {payment.busy ? CHECKOUT_COPY.paying : CHECKOUT_COPY.pay(formatRupees(total))}
                            </Button>
                            <TicketNote />
                        </CheckoutCard>
                    </Reveal>
                </aside>
            </form>
            <TestPaymentDialog
                open={payment.testPayment.open}
                total={payment.order?.total ?? total}
                paying={payment.testPayment.paying}
                onPay={payment.testPayment.confirm}
                onClose={payment.testPayment.close}
            />
        </FormProvider>
    )
}
