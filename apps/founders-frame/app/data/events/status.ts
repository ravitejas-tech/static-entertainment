export const FEW_LEFT_THRESHOLD = 10

export const SEAT_STATUS_LABELS = {
    open: 'Open',
    'few-left': 'A few left',
    full: 'Sold out',
    'opens-later': 'Not on sale yet',
    closed: 'Off sale',
} as const

export const OPEN_STATUSES = ['open', 'few-left'] as const
