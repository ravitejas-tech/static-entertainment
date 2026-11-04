import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const textVariants = cva('', {
    variants: {
        variant: {
            inherit: '',
            body: 'text-base/relaxed',
            small: 'text-sm/normal',
            label: 'text-sm font-medium',
            strong: 'text-base/relaxed font-semibold',
            badge: 'text-xs font-medium',
            meta: 'text-xs font-semibold tracking-widest uppercase',
            lead: 'text-lg/relaxed sm:text-xl/relaxed',
            reading: 'text-base/relaxed sm:text-lg/relaxed',
            subtitle: 'font-display text-lg/snug font-semibold tracking-tight',
            title: 'font-display text-xl/snug font-semibold tracking-tight',
            section: 'font-display text-2xl/tight font-bold tracking-tight sm:text-3xl/tight',
            heading: 'font-display text-3xl/tight font-bold tracking-tight sm:text-4xl/tight',
            display: 'font-display text-4xl/tight font-bold tracking-tight text-balance sm:text-5xl/tight',
            hero: 'font-display text-4xl/tight font-bold tracking-tighter text-balance sm:text-6xl/none',
            stat: 'font-display text-2xl/none font-bold tracking-tight tabular-nums',
            code: 'font-mono text-sm tracking-wide',
        },
        tone: {
            inherit: '',
            primary: 'text-text-primary',
            secondary: 'text-text-secondary',
            muted: 'text-text-muted',
            faint: 'text-text-faint',
            accent: 'text-accent-text',
            danger: 'text-danger',
            success: 'text-success',
            'on-accent': 'text-accent-foreground',
            inverse: 'text-ivory',
            'inverse-muted': 'text-ivory/75',
        },
    },
})

export type TextVariant = NonNullable<VariantProps<typeof textVariants>['variant']>
export type TextTone = NonNullable<VariantProps<typeof textVariants>['tone']>

const DEFAULT_TONES: Partial<Record<TextVariant, TextTone>> = {
    inherit: 'inherit',
    badge: 'inherit',
    meta: 'accent',
}

type TextTag = 'p' | 'span' | 'div' | 'li' | 'h1' | 'h2' | 'h3' | 'h4' | 'strong' | 'small' | 'dt' | 'dd' | 'label'

export interface TextProps extends HTMLAttributes<HTMLElement> {
    as?: TextTag
    variant?: TextVariant
    tone?: TextTone
}

export function Text({ as: Tag = 'p', variant = 'body', tone, className, ...props }: TextProps) {
    return (
        <Tag
            className={cn(textVariants({ variant, tone: tone ?? DEFAULT_TONES[variant] ?? 'primary' }), className)}
            {...props}
        />
    )
}
