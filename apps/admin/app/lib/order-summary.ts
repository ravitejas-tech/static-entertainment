import { ORDERS_COPY } from '~/data/orders/copy'
import { formatRupees } from '~/lib/format'
import { countPeople } from '~/lib/orders'
import { answersSchema, questionListSchema } from '~/schemas/orders'
import type { Json } from '~/types/database'
import type { OrderDetail } from '~/types/orders'

const { summary, sources } = ORDERS_COPY

export function orderSummary(order: OrderDetail) {
    const tickets = summary.tickets(countPeople(order.order_items))
    const total = formatRupees(order.total)
    const lines: Record<OrderDetail['status'], string[]> = {
        paid: order.source === 'online' ? [summary.paid, tickets, total] : [sources[order.source], tickets],
        pending: [summary.pending, tickets, total],
        expired: [summary.expired],
        failed: [summary.failed],
        cancelled: [summary.cancelled],
        refunded: [summary.refunded(formatRupees(order.refund_amount ?? order.total))],
    }
    return lines[order.status].join(' · ')
}

export function answerItems(questions: Json | undefined, answers: Json) {
    const labels = new Map(questionListSchema.parse(questions ?? []).map(({ id, label }) => [id, label]))
    return Object.entries(answersSchema.parse(answers)).map(([key, value]) => ({
        label: labels.get(key) ?? key,
        value: String(value),
    }))
}
