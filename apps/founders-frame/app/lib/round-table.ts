export const spinProgress = (spin: Animation) => {
    const duration = Number(spin.effect?.getTiming().duration)
    const elapsed = Number(spin.currentTime ?? 0)
    return duration > 0 ? (elapsed % duration) / duration : 0
}

export const seatAtTop = (progress: number, count: number) => Math.round(progress * count) % count
