import { useMemo, useState } from 'react'
import { MAX_PEOPLE_PER_ORDER } from '~/data/registration/limits'
import { cartLines, cartPeople, cartSubtotal, initialCart, stepQuantity } from '~/lib/registration/cart'
import type { RegistrationOption } from '~/types/events'
import type { Cart } from '~/types/registration'

export function useCart(options: RegistrationOption[], seat: string | null) {
    const [cart, setCart] = useState<Cart>(() => initialCart(options, seat))
    const lines = useMemo(() => cartLines(options, cart), [options, cart])
    const people = cartPeople(lines)

    const quantityOf = (option: RegistrationOption) => Math.min(cart[option.id] ?? 0, option.max)

    const canAdd = (option: RegistrationOption) => {
        const current = quantityOf(option)
        const next = stepQuantity(current, 1, option)
        return next > current && people + (next - current) * option.admits <= MAX_PEOPLE_PER_ORDER
    }

    const change = (option: RegistrationOption, delta: 1 | -1) =>
        setCart((previous) => ({
            ...previous,
            [option.id]: stepQuantity(Math.min(previous[option.id] ?? 0, option.max), delta, option),
        }))

    return { lines, subtotal: cartSubtotal(lines), quantityOf, canAdd, change }
}
