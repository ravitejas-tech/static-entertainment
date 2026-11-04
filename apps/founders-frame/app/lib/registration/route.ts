import { SEAT_PARAM } from '~/data/navigation'

export async function loadRegistrationRoute(slug: string, request: Request) {
    const { loadRegistration } = await import('~/services/event-catalog')
    return { event: await loadRegistration(slug), seat: new URL(request.url).searchParams.get(SEAT_PARAM) }
}
