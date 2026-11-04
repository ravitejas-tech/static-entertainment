import { NEW_TICKET_DEFAULTS, TICKET_PRESETS, TICKETS_COPY } from '~/data/events/tickets'
import { fromOptionalIstInput, hasPassed, toIstInput } from '~/lib/date-input'
import { formatRupees } from '~/lib/format'
import type { TicketTypeValues } from '~/schemas/ticket-type'
import type {
    TicketAvailability,
    TicketPreset,
    TicketSaleState,
    TicketType,
    TicketTypeInsert,
    TicketTypeStock,
} from '~/types/ticket-types'

export const ticketPresetsFor = (community: string) => TICKET_PRESETS[community] ?? []

export const priceLabel = (price: number) => (price > 0 ? formatRupees(price) : TICKETS_COPY.free)

export function withStock(types: readonly TicketType[], stock: readonly TicketAvailability[]): TicketTypeStock[] {
    return types.map((type) => {
        const remaining = stock.find(({ ticket_type_id }) => ticket_type_id === type.id)?.remaining ?? type.quantity
        return { ...type, remaining, booked: Math.max(type.quantity - remaining, 0) }
    })
}

export function ticketSaleState(type: TicketTypeStock): TicketSaleState {
    if (!type.visible) return 'hidden'
    if (type.sold_out || type.remaining === 0) return 'sold_out'
    if (type.sales_start && !hasPassed(type.sales_start)) return 'not_started'
    if (hasPassed(type.sales_end)) return 'ended'
    return 'on_sale'
}

export function ticketToForm(source?: TicketType | TicketPreset): TicketTypeValues {
    if (!source) return { ...NEW_TICKET_DEFAULTS }
    if (!('id' in source)) return { ...NEW_TICKET_DEFAULTS, ...source }
    return {
        name: source.name,
        description: source.description,
        price: source.price,
        quantity: source.quantity,
        admits: source.admits,
        min_per_order: source.min_per_order,
        max_per_order: source.max_per_order,
        sales_start: toIstInput(source.sales_start),
        sales_end: toIstInput(source.sales_end),
        visible: source.visible,
        sold_out: source.sold_out,
        requires_approval: source.requires_approval,
    }
}

export function formToTicket(eventId: string, values: TicketTypeValues, sortOrder: number): TicketTypeInsert {
    return {
        ...values,
        event_id: eventId,
        sort_order: sortOrder,
        sales_start: fromOptionalIstInput(values.sales_start),
        sales_end: fromOptionalIstInput(values.sales_end),
    }
}
