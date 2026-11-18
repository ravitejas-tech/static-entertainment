import type { RegistrationOption } from '~/types/events'
import type { Cart, CartLine } from '~/types/registration'

export function cartLines(options: RegistrationOption[], cart: Cart): CartLine[] {
    return options.flatMap((option) => {
        const quantity = Math.min(cart[option.id] ?? 0, option.max)
        return quantity > 0 ? [{ option, quantity, amount: quantity * option.price }] : []
    })
}

export const cartSubtotal = (lines: CartLine[]) => lines.reduce((sum, { amount }) => sum + amount, 0)

export const cartPeople = (lines: CartLine[]) =>
    lines.reduce((sum, { quantity, option }) => sum + quantity * option.admits, 0)

export function stepQuantity(current: number, delta: 1 | -1, { minPerOrder, max }: RegistrationOption) {
    const next = current + delta
    if (delta > 0) return Math.min(Math.max(next, minPerOrder), max)
    return next < minPerOrder ? 0 : next
}

export function initialCart(options: RegistrationOption[], seat: string | null): Cart {
    const bookable = options.filter(({ max }) => max > 0)
    const preselected = bookable.find(({ id }) => id === seat) ?? (bookable.length === 1 ? bookable[0] : undefined)
    return preselected ? { [preselected.id]: preselected.minPerOrder } : {}
}
