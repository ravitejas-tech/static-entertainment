export const EVENT_CARD_COPY = {
    ended: 'Ended',
    closed: 'Bookings closed',
    from: (price: string) => `From ${price}`,
    book: 'Book tickets',
    when: (day: string, time: string, place: string) => `${day} · ${time} · ${place}`,
} as const
