import { ORDERS_COPY } from '~/data/orders/copy'
import { DIRECT_SOURCE } from '~/data/orders/query'
import { CANCELLABLE_STATUSES, ORDER_FILTERS, REFUNDABLE_STATUSES } from '~/data/orders/status'
import type { Tables } from '~/types/database'
import type { OrderFilter } from '~/types/orders'

type OrderState = Pick<Tables<'orders'>, 'status' | 'needs_refund' | 'total'>

export function parseOrderFilter(value: string | null): OrderFilter {
    return ORDER_FILTERS.find((option) => option.value === value)?.value ?? 'all'
}

export const orderSourceLabel = ({ source, utm_source }: Pick<Tables<'orders'>, 'source' | 'utm_source'>) =>
    source === 'online' ? utm_source || DIRECT_SOURCE : ORDERS_COPY.sources[source]

export function countPeople(items: readonly { quantity: number; admits: number }[]) {
    return items.reduce((sum, { quantity, admits }) => sum + quantity * admits, 0)
}

export function canRefund({ status, needs_refund, total }: OrderState) {
    return total > 0 && (needs_refund || REFUNDABLE_STATUSES.includes(status))
}

export function canCancel({ status }: OrderState) {
    return CANCELLABLE_STATUSES.includes(status)
}

export function ticketPageUrl(siteUrl: string, accessToken: string) {
    return `${siteUrl}/tickets/${accessToken}`
}
