import { Text, type TextTone } from '~/components/ui/text'
import { useTypewriter } from '~/hooks/use-typewriter'
import { formatList } from '~/lib/format'
import { cn } from '~/lib/utils'

export interface TypewriterProps {
    words: readonly string[]
    tone?: TextTone
    className?: string
}

export function Typewriter({ words, tone = 'inherit', className }: TypewriterProps) {
    const { text, typing } = useTypewriter(words)

    return (
        <Text
            as='span'
            variant='inherit'
            tone={tone}
            className={className}>
            <Text
                as='span'
                variant='inherit'
                className='sr-only'>
                {formatList(words)}
            </Text>
            <Text
                as='span'
                variant='inherit'
                aria-hidden>
                {text}
                <Text
                    as='span'
                    variant='inherit'
                    className={cn(
                        'ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 bg-current',
                        typing ? 'motion-safe:animate-caret' : 'invisible',
                    )}
                />
            </Text>
        </Text>
    )
}
