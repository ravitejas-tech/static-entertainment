import { RiseWords } from '~/components/ui/rise-words'
import { Text } from '~/components/ui/text'
import { HERO } from '~/data/landing/hero'
import { splitWords } from '~/lib/words'

export function HeroHeadline() {
    return (
        <Text
            as='h1'
            variant='hero'
            className='xl:text-7xl/none'>
            <Text
                as='span'
                variant='inherit'
                tone='faint'
                className='block'>
                <RiseWords
                    text={HERO.title.muted}
                    trigger='load'
                />
            </Text>{' '}
            <Text
                as='span'
                variant='inherit'
                className='mt-1 block xl:mt-2'>
                <RiseWords
                    text={HERO.title.strong}
                    trigger='load'
                    startOrder={splitWords(HERO.title.muted).length}
                    underlineLast
                />
            </Text>
        </Text>
    )
}
