import { TYPEWRITER_TIMING } from '~/data/ui/motion'

export interface TypewriterFrame {
    text: string
    delay: number
}

export function typewriterFrames(words: readonly string[]) {
    const frames: TypewriterFrame[] = []
    let current = words[0] ?? ''

    for (const next of [...words.slice(1), current]) {
        for (let length = current.length - 1; length >= 0; length--) {
            const first = length === current.length - 1
            frames.push({
                text: current.slice(0, length),
                delay: first
                    ? frames.length === 0
                        ? TYPEWRITER_TIMING.start
                        : TYPEWRITER_TIMING.hold
                    : TYPEWRITER_TIMING.erase,
            })
        }
        for (let length = 1; length <= next.length; length++) {
            frames.push({
                text: next.slice(0, length),
                delay: length === 1 ? TYPEWRITER_TIMING.gap : TYPEWRITER_TIMING.type,
            })
        }
        current = next
    }

    return frames
}
