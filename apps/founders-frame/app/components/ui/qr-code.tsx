import { useMemo } from 'react'
import { QR_QUIET_ZONE } from '~/data/ui/forms'
import { qrPath } from '~/lib/qr'
import { cn } from '~/lib/utils'

export interface QrCodeProps {
    value: string
    label: string
    className?: string
}

export function QrCode({ value, label, className }: QrCodeProps) {
    const { size, path } = useMemo(() => qrPath(value, QR_QUIET_ZONE), [value])

    return (
        <div className={cn('rounded-lg border border-border bg-ivory p-2', className)}>
            <svg
                viewBox={`0 0 ${size} ${size}`}
                className='block size-full fill-current text-ink'
                shapeRendering='crispEdges'
                role='img'
                aria-label={label}>
                <path d={path} />
            </svg>
        </div>
    )
}
