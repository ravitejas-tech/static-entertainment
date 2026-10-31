import type { ReactNode } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { BRAND } from '~/data/brand'
import { ERROR_COPY } from '~/data/ui/error'
import type { Route } from './+types/root'
import './global.css'

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang={BRAND.language}>
            <head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, viewport-fit=cover'
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    const { title, details } =
        isRouteErrorResponse(error) && error.status === 404 ? ERROR_COPY.notFound : ERROR_COPY.failed

    return (
        <main>
            <h1>{title}</h1>
            <p>{details}</p>
        </main>
    )
}
