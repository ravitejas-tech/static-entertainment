import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Reveal } from '~/components/ui/reveal'
import { RiseWords } from '~/components/ui/rise-words'
import { Text } from '~/components/ui/text'

const detailBlockVariants = cva('flex flex-col', {
    variants: {
        tone: {
            plain: 'gap-5 sm:gap-6',
            muted: 'gap-4 rounded-2xl bg-surface-muted p-5 sm:p-7',
        },
    },
    defaultVariants: { tone: 'plain' },
})

export interface DetailBlockProps extends VariantProps<typeof detailBlockVariants> {
    title: string
    children: ReactNode
}

export function DetailBlock({ title, tone, children }: DetailBlockProps) {
    return (
        <section className={detailBlockVariants({ tone })}>
            <Text
                as='h2'
                variant={tone === 'muted' ? 'title' : 'section'}>
                <RiseWords text={title} />
            </Text>
            <Reveal order={2}>{children}</Reveal>
        </section>
    )
}
