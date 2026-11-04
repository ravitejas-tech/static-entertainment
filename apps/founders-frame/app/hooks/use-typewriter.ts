import { useEffect, useMemo, useState } from 'react'
import { REDUCED_MOTION_QUERY } from '~/data/ui/motion'
import { typewriterFrames } from '~/lib/typewriter'

export function useTypewriter(words: readonly string[]) {
    const frames = useMemo(() => typewriterFrames(words), [words])
    const [frameIndex, setFrameIndex] = useState(-1)

    useEffect(() => {
        if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return

        let timer: ReturnType<typeof setTimeout>
        const play = (index: number) => {
            const frame = frames[index]
            if (!frame) return
            timer = setTimeout(() => {
                setFrameIndex(index)
                play(index + 1)
            }, frame.delay)
        }
        play(0)

        return () => clearTimeout(timer)
    }, [frames])

    return {
        text: frames[frameIndex]?.text ?? words[0] ?? '',
        typing: frameIndex >= 0 && frameIndex < frames.length - 1,
    }
}
