import type { FormEvent } from 'react'
import { useRevalidator } from 'react-router'
import { FIELD_ERROR_CODES, PROMO_ERROR_CODES, REFRESH_AVAILABILITY_ON } from '~/data/registration/errors'
import { FIELD_IDS } from '~/data/registration/page'
import { useCart } from '~/hooks/registration/use-cart'
import { usePayment } from '~/hooks/registration/use-payment'
import { usePromo } from '~/hooks/registration/use-promo'
import { useRegistrationForm } from '~/hooks/registration/use-registration-form'
import { isOneOf } from '~/lib/options'
import { registrationErrorCode, registrationErrorMessage } from '~/lib/registration/errors'
import { toOrderRequest } from '~/lib/registration/request'
import type { EventDetail, RegistrationOption } from '~/types/events'

const scrollToTickets = () => document.getElementById(FIELD_IDS.tickets)?.scrollIntoView({ block: 'start' })

export function useCheckout(event: EventDetail, seat: string | null) {
    const revalidator = useRevalidator()
    const cart = useCart(event.options, seat)
    const form = useRegistrationForm(event)
    const promo = usePromo(event.id, cart.subtotal)
    const payment = usePayment(event.title)

    const onOrderError = (error: Error) => {
        const code = registrationErrorCode(error)
        const field = FIELD_ERROR_CODES[code]
        if (field) form.setError(field, { message: registrationErrorMessage(error) }, { shouldFocus: true })
        if (isOneOf(PROMO_ERROR_CODES, code)) promo.remove()
        if (isOneOf(REFRESH_AVAILABILITY_ON, code)) {
            void revalidator.revalidate()
            scrollToTickets()
        }
    }

    const pay = form.handleSubmit((values) =>
        payment.pay(toOrderRequest(event.id, cart.lines, values, promo.applied?.code), onOrderError),
    )

    const submit = (formEvent: FormEvent<HTMLFormElement>) => {
        if (cart.lines.length > 0) return pay(formEvent)
        formEvent.preventDefault()
        scrollToTickets()
    }

    const changeQuantity = (option: RegistrationOption, delta: 1 | -1) => {
        cart.change(option, delta)
        payment.release()
    }

    return {
        cart,
        form,
        promo,
        payment,
        submit,
        changeQuantity,
        total: Math.max(0, cart.subtotal - promo.discount),
    }
}
