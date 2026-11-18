import type { EventCategory } from '~/types/events'

export const categoryOptions = (categories: readonly EventCategory[]) =>
    categories.map(({ slug, label }) => ({ value: slug, label }))
