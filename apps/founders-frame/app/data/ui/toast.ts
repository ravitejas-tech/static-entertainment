import type { ToasterProps } from 'react-hot-toast'

export const TOAST_OPTIONS: ToasterProps['toastOptions'] = {
    duration: 4000,
    className: 'rounded-lg border border-border shadow-card font-sans text-sm font-medium',
    style: { background: 'var(--surface)', color: 'var(--text-primary)', maxWidth: '26rem' },
    success: { iconTheme: { primary: 'var(--success)', secondary: 'var(--surface)' } },
    error: { iconTheme: { primary: 'var(--danger)', secondary: 'var(--surface)' } },
}
