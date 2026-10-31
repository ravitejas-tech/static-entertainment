import { BRAND } from '~/data/brand'
import type { Route } from './+types/index'

export const meta: Route.MetaFunction = () => [
    { title: BRAND.name },
    { name: 'description', content: BRAND.description },
]

export default function Home() {
    return (
        <main>
            <h1>{BRAND.name}</h1>
            <p>{BRAND.description}</p>
        </main>
    )
}
