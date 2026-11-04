import { useEffect, useRef, type ReactNode } from 'react'

export interface DialogProps {
    open: boolean
    onClose: () => void
    labelledBy: string
    dismissible?: boolean
    children: ReactNode
}

export function Dialog({ open, onClose, labelledBy, dismissible = true, children }: DialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (open && !dialog?.open) dialog?.showModal()
        if (!open && dialog?.open) dialog.close()
    }, [open])

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={labelledBy}
            onClose={onClose}
            onCancel={(event) => !dismissible && event.preventDefault()}
            onClick={(event) => dismissible && event.target === event.currentTarget && onClose()}
            className='fixed inset-x-0 top-auto bottom-0 m-0 max-h-full w-full max-w-full overflow-y-auto rounded-t-2xl border border-b-0 border-border bg-surface text-text-primary shadow-dialog backdrop:bg-ink/50 backdrop:backdrop-blur-sm sm:inset-0 sm:m-auto sm:h-fit sm:max-w-md sm:rounded-2xl sm:border-b'>
            {open && children}
        </dialog>
    )
}
