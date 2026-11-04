import { Fragment, type CSSProperties } from 'react'
import { DrawnUnderline } from '~/components/ui/drawn-underline'
import { Text } from '~/components/ui/text'
import { splitWords } from '~/lib/words'

const TRIGGER_CLASSES = {
    load: 'motion-safe:animate-word-rise',
    scroll: 'motion-safe:animate-word-rise-scroll',
} as const

export interface RiseWordsProps {
    text: string
    trigger?: keyof typeof TRIGGER_CLASSES
    startOrder?: number
    underlineLast?: boolean
}

export function RiseWords({ text, trigger = 'scroll', startOrder = 0, underlineLast = false }: RiseWordsProps) {
    const words = splitWords(text)

    return words.map((word, index) => {
        const underlined = underlineLast && index === words.length - 1
        const mask = (
            <Text
                as='span'
                variant='inherit'
                className='word-mask'>
                <Text
                    as='span'
                    variant='inherit'
                    className={TRIGGER_CLASSES[trigger]}
                    style={{ '--word-order': startOrder + index } as CSSProperties}>
                    {word}
                </Text>
            </Text>
        )

        return (
            <Fragment key={`${index}-${word}`}>
                {underlined ? (
                    <Text
                        as='span'
                        variant='inherit'
                        className='relative inline-block'>
                        {mask}
                        <DrawnUnderline />
                    </Text>
                ) : (
                    mask
                )}
                {index < words.length - 1 && ' '}
            </Fragment>
        )
    })
}
