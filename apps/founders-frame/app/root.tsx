import { lazy, Suspense, type ReactNode } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { ErrorPage } from '~/components/layout/error-page'
import { PageLoader } from '~/components/layout/page-loader'
import { SkipLink } from '~/components/layout/skip-link'
import { useHydrated } from '~/hooks/use-hydrated'
import { SEO_FILES } from '~/data/seo/routes'
import { BRAND_ICONS, SITE, THEME_COLOR } from '~/data/seo/site'
import { ERROR_COPY, ERROR_ROBOTS } from '~/data/ui/error'
import { FONT_PRELOADS } from '~/data/ui/fonts'
import type { Route } from './+types/root'
import './global.css'

export const links: Route.LinksFunction = () => [
    {
        rel: 'icon',
        type: 'image/png',
        sizes: `${BRAND_ICONS.favicon.size}x${BRAND_ICONS.favicon.size}`,
        href: BRAND_ICONS.favicon.path,
    },
    { rel: 'apple-touch-icon', href: BRAND_ICONS.appleTouch },
    { rel: 'manifest', href: SEO_FILES.manifest },
    ...FONT_PRELOADS.map((href) => ({
        rel: 'preload',
        href,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous' as const,
    })),
]

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang={SITE.language}>
            <head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, viewport-fit=cover'
                />
                <meta
                    name='theme-color'
                    content={THEME_COLOR}
                />
                <Meta />
                <Links />
            </head>
            <body>
                <SkipLink />
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

const Toaster = lazy(() => import('~/components/ui/toaster').then(({ Toaster }) => ({ default: Toaster })))

export default function App() {
    const hydrated = useHydrated()

    return (
        <>
            <Outlet />
            {hydrated && (
                <Suspense>
                    <Toaster />
                </Suspense>
            )}
        </>
    )
}

export function HydrateFallback() {
    return <PageLoader />
}

export const meta: Route.MetaFunction = ({ error }) => (error ? [{ name: 'robots', content: ERROR_ROBOTS }] : [])

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        return error.status === 404 ? (
            <ErrorPage {...ERROR_COPY.notFound} />
        ) : (
            <ErrorPage
                title={ERROR_COPY.failed.title}
                details={error.statusText || ERROR_COPY.failed.details}
            />
        )
    }

    const isDevError = import.meta.env.DEV && error instanceof Error
    return (
        <ErrorPage
            title={ERROR_COPY.failed.title}
            details={isDevError ? error.message : ERROR_COPY.failed.details}
            stack={isDevError ? error.stack : undefined}
        />
    )
}
