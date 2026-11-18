import type { Ref, TextareaHTMLAttributes } from 'react'
import { ControlFrame } from '~/components/ui/control-frame'
import { CONTROL_TEXT } from '~/data/ui/forms'
import { cn } from '~/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: Ref<HTMLTextAreaElement>
}

export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
    return (
        <ControlFrame
            multiline
            invalid={props['aria-invalid'] === true}
            className={className}>
            <textarea
                rows={rows}
                className={cn(CONTROL_TEXT, 'min-h-30 resize-y px-4 py-3')}
                {...props}
            />
        </ControlFrame>
    )
}
