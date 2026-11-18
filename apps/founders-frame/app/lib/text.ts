export function initials(name: string) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
}

export function paragraphs(text: string) {
    return text.split(/\n\s*\n/).filter(Boolean)
}
