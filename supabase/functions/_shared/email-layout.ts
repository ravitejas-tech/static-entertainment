import { CONFIG } from './config.ts'
import type { EmailTheme } from './email-themes.ts'

export const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char)

export const formatWhen = (startsAt: string) =>
    new Intl.DateTimeFormat(CONFIG.locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: CONFIG.timeZone,
    }).format(new Date(startsAt))

export const formatRupees = (amount: number) =>
    new Intl.NumberFormat(CONFIG.locale, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export const emailPage = (theme: EmailTheme, body: string) =>
    `<div style="background:${theme.page};padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:${theme.ink}">
${body}
</div>`

export const emailCard = (theme: EmailTheme, header: string, headerFill: string, inner: string) => `
<div style="max-width:520px;margin:0 auto 20px;background:${theme.surface};border:${theme.cardBorder};border-radius:${theme.cardRadius}px;box-shadow:${theme.cardShadow};overflow:hidden">
  <div style="background:${headerFill};color:${theme.headerText};border-bottom:${theme.cardBorder};padding:12px 24px;font-weight:800;letter-spacing:2px;text-transform:uppercase;font-size:12px">${header}</div>
  <div style="padding:24px">${inner}</div>
</div>`

export const emailButton = ({ button }: EmailTheme, href: string, label: string) =>
    `<a href="${escapeHtml(href)}" style="display:inline-block;background:${button.background};color:${button.text};border:${button.border};border-radius:${button.radius}px;padding:12px 24px;font-weight:800;text-decoration:none">${label}</a>`

export const emailNote = (theme: EmailTheme, html: string) =>
    `<p style="max-width:520px;margin:0 auto;font-size:13px;line-height:20px;color:${theme.muted}">${html}</p>`
