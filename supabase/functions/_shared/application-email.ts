import type { EmailMessage } from './email.ts'
import { emailButton, emailCard, emailPage, escapeHtml, formatWhen } from './email-layout.ts'
import { emailThemeFor } from './email-themes.ts'
import { type CommunitySite, requireSiteUrl } from './site-url.ts'

export type ApplicationEmailKind = 'received' | 'approved' | 'waitlisted' | 'rejected'

export interface ApplicationNotice {
    accessToken: string
    name: string
    email: string
    ticketType: string
    event: { title: string; starts_at: string; venue_name: string; city: string }
    community: CommunitySite & { name: string }
}

interface ApplicationCopy {
    subject: string
    header: string
    title: string
    paragraphs: string[]
    button?: string
}

export const applicationPageUrl = (siteUrl: string, accessToken: string) => `${siteUrl}/applications/${accessToken}`

const COPY: Record<ApplicationEmailKind, (notice: ApplicationNotice, when: string) => ApplicationCopy> = {
    received: ({ event, community }) => ({
        subject: `Your application for ${event.title} is in`,
        header: 'Application received',
        title: 'Your application is in.',
        paragraphs: [
            `Thank you for your interest in ${community.name}. Our team will review your application for ${event.title} and email you with an update.`,
            'We’ll be in touch soon.',
        ],
        button: 'View your application',
    }),
    approved: ({ event }, when) => ({
        subject: `Your application has been approved — ${event.title}`,
        header: 'Application approved',
        title: 'You’re approved. Welcome in.',
        paragraphs: [
            `Your application for ${event.title} on ${when} has been approved.`,
            'Please confirm your attendance so we can issue your entry QR code. We look forward to meeting you.',
        ],
        button: 'Confirm my place',
    }),
    waitlisted: ({ event }) => ({
        subject: `You’re on the waitlist — ${event.title}`,
        header: 'Waitlist',
        title: 'You’re on the waitlist.',
        paragraphs: [
            `Thank you for applying to ${event.title}. The room is full for now, so we’ve added you to the waitlist.`,
            'We’ll email you if a place opens up.',
        ],
    }),
    rejected: ({ event, community }) => ({
        subject: `Your application for ${event.title}`,
        header: community.name,
        title: `Thank you for your interest in ${community.name}.`,
        paragraphs: [
            'We appreciate you taking the time to apply. Unfortunately, we won’t be able to offer you a place at this particular gathering.',
            'Our event capacity and attendee mix are limited, and this decision isn’t a reflection of your potential or the value you bring.',
            `We’d love for you to stay connected and explore future ${community.name} events.`,
            'Warmly,',
            `The ${community.name} Team`,
        ],
    }),
}

export function buildApplicationEmail(notice: ApplicationNotice, kind: ApplicationEmailKind): EmailMessage {
    const theme = emailThemeFor(notice.community.slug)
    const when = formatWhen(notice.event.starts_at)
    const copy = COPY[kind](notice, when)
    const link = copy.button ? applicationPageUrl(requireSiteUrl(notice.community), notice.accessToken) : null
    const paragraphs = copy.paragraphs
        .map((paragraph) => `<p style="margin:0 0 12px;font-size:16px;line-height:24px">${escapeHtml(paragraph)}</p>`)
        .join('')

    const html = emailPage(
        theme,
        emailCard(
            theme,
            escapeHtml(copy.header),
            theme.headers.notice,
            `<h1 style="margin:0 0 12px;font-size:24px;line-height:30px">${escapeHtml(copy.title)}</h1>
         <p style="margin:0 0 16px;font-size:14px;line-height:22px;color:${theme.muted}">${escapeHtml(notice.event.title)} · ${escapeHtml(when)} · ${escapeHtml(notice.event.venue_name || notice.event.city)}</p>
         ${paragraphs}
         ${link && copy.button ? `<p style="margin:20px 0 0">${emailButton(theme, link, copy.button)}</p>` : ''}`,
        ),
    )

    const text = [copy.title, ...copy.paragraphs, ...(link ? [link] : [])].join('\n\n')

    return {
        to: { email: notice.email, name: notice.name },
        subject: copy.subject,
        html,
        text,
        senderName: notice.community.name,
    }
}
