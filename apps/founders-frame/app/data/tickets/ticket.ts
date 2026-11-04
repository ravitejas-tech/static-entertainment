export const QR_PREFIX = 'ECHOVERSE:'

export const ticketQrValue = (qrToken: string) => `${QR_PREFIX}${qrToken}`
