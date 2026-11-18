import QRCode from 'npm:qrcode@1.5.4'
import { encodeBase64 } from 'jsr:@std/encoding@1/base64'
import type { Booking } from './booking.ts'
import { QR_PREFIX } from './booking.ts'
import { directionsUrl } from './directions.ts'
import type { EmailMessage } from './email.ts'
import { emailButton, emailCard, emailNote, emailPage, escapeHtml, formatRupees, formatWhen } from './email-layout.ts'
import { emailThemeFor } from './email-themes.ts'
import { requireSiteUrl } from './site-url.ts'

export const ticketPageUrl = (siteUrl: string, accessToken: string) => `${siteUrl}/tickets/${accessToken}`

async function qrImage(token: string, index: number) {
    const png: Uint8Array = await QRCode.toBuffer(`${QR_PREFIX}${token}`, { width: 320, margin: 1, errorCorrectionLevel: 'M' })
    return { contentId: `ticket-${index + 1}`, filename: `ticket-${index + 1}.png`, base64: encodeBase64(png) }
}

export async function buildTicketEmail(booking: Booking, accessToken: string): Promise<EmailMessage> {
    const { community, order, event, tickets } = booking
    const theme = emailThemeFor(community.slug)
    const images = await Promise.all(tickets.map((ticket, index) => qrImage(ticket.qr_token, index)))
    const siteUrl = requireSiteUrl(community)
    const link = ticketPageUrl(siteUrl, accessToken)
    const when = formatWhen(event.starts_at)
    const venue = [event.venue_name, event.venue_address].filter(Boolean).join(', ') || event.city

    const summary = emailCard(
        theme,
        theme.welcome,
        theme.headers.summary,
        `<h1 style="margin:0 0 8px;font-size:26px;line-height:32px">${escapeHtml(event.title)}</h1>
         <p style="margin:0 0 4px;font-size:16px;line-height:24px"><strong>${escapeHtml(when)}</strong></p>
         <p style="margin:0 0 16px;font-size:15px;line-height:22px;color:${theme.muted}">${escapeHtml(venue)}</p>
         <p style="margin:0 0 20px;font-size:14px;line-height:22px">Booking ID <strong>${order.booking_code}</strong> · ${tickets.length} ${tickets.length === 1 ? 'ticket' : 'tickets'}${order.total > 0 ? ` · ${formatRupees(order.total)} paid` : ''}</p>
         ${emailButton(theme, link, 'Open my tickets')}
         <a href="${escapeHtml(directionsUrl(event))}" style="display:inline-block;margin-left:8px;color:${theme.ink};font-weight:700">Directions</a>`,
    )

    const ticketCards = tickets
        .map((ticket, index) =>
            emailCard(
                theme,
                `${escapeHtml(community.name)} ${theme.separator} Admit one`,
                theme.headers.ticket,
                `<p style="margin:0 0 4px;font-size:18px;font-weight:800">${escapeHtml(ticket.ticket_type)}</p>
                 <p style="margin:0 0 16px;font-size:14px;color:${theme.muted}">Ticket ${index + 1} of ${tickets.length} · ${ticket.code}</p>
                 <img src="cid:ticket-${index + 1}" width="220" height="220" alt="QR code for ticket ${ticket.code}" style="display:block;border:${theme.qrBorder};border-radius:16px;background:#ffffff;padding:8px" />
                 <p style="margin:16px 0 0;font-size:13px;color:${theme.muted}">Show this at the gate. Each code lets one person in once.</p>`,
            ),
        )
        .join('')

    const html = emailPage(
        theme,
        `${summary}
${ticketCards}
${emailNote(theme, `Can’t see the QR codes? Open your tickets with the button above${theme.myTickets ? ` — they’re also in My Tickets on ${new URL(siteUrl).host}` : ''}.`)}`,
    )

    const text = [
        `You're in! ${event.title}`,
        when,
        venue,
        `Booking ID: ${order.booking_code}`,
        `Your tickets: ${link}`,
        ...tickets.map((ticket) => `${ticket.ticket_type} · ${ticket.code}`),
    ].join('\n')

    return {
        to: { email: order.email, name: order.name },
        subject: `Your tickets for ${event.title} 🎟️`,
        html,
        text,
        images,
        senderName: community.name,
    }
}

export function buildRefundEmail(booking: Booking, amount: number): EmailMessage {
    const { community, order, event } = booking
    const theme = emailThemeFor(community.slug)
    const html = emailPage(
        theme,
        emailCard(
            theme,
            escapeHtml(community.name),
            theme.headers.notice,
            `<h1 style="margin:0 0 12px;font-size:24px">Your refund is on its way</h1>
     <p style="margin:0 0 12px;font-size:16px;line-height:24px">We've refunded ${formatRupees(amount)} for booking <strong>${order.booking_code}</strong> (${escapeHtml(event.title)}). Your tickets for this booking no longer work.</p>
     <p style="margin:0;font-size:14px;line-height:22px;color:${theme.muted}">Refunds usually reach your account in 5–7 working days.</p>`,
        ),
    )
    return {
        to: { email: order.email, name: order.name },
        subject: `Refund for ${event.title}`,
        html,
        text: `We've refunded ${formatRupees(amount)} for booking ${order.booking_code} (${event.title}). Refunds usually reach your account in 5–7 working days.`,
        senderName: community.name,
    }
}
