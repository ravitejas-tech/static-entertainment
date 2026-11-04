export interface EmailTheme {
    page: string
    surface: string
    ink: string
    muted: string
    cardBorder: string
    cardRadius: number
    cardShadow: string
    headerText: string
    headers: { summary: string; ticket: string; notice: string }
    button: { background: string; text: string; border: string; radius: number }
    qrBorder: string
    welcome: string
    separator: string
    myTickets: boolean
}

const ECHOVERSE: EmailTheme = {
    page: '#fff6ea',
    surface: '#ffffff',
    ink: '#1b1035',
    muted: '#4b3f6b',
    cardBorder: '2px solid #1b1035',
    cardRadius: 24,
    cardShadow: '5px 5px 0 #1b1035',
    headerText: '#1b1035',
    headers: { summary: '#ffd43b', ticket: '#3ccff5', notice: '#a58bff' },
    button: { background: '#ff4f9a', text: '#1b1035', border: '2px solid #1b1035', radius: 999 },
    qrBorder: '2px solid #1b1035',
    welcome: 'You’re in 🎉',
    separator: '✦',
    myTickets: true,
}

const FOUNDERS_FRAME: EmailTheme = {
    page: '#F7F6F2',
    surface: '#FFFFFF',
    ink: '#0F1F3D',
    muted: '#46526A',
    cardBorder: '1px solid #DDDCD5',
    cardRadius: 12,
    cardShadow: 'none',
    headerText: '#C9A04B',
    headers: { summary: '#0F1F3D', ticket: '#0F1F3D', notice: '#0F1F3D' },
    button: { background: '#1B3766', text: '#FFFFFF', border: '0', radius: 6 },
    qrBorder: '1px solid #DDDCD5',
    welcome: 'You’re confirmed',
    separator: '·',
    myTickets: false,
}

const EMAIL_THEMES: Record<string, EmailTheme> = {
    echoverse: ECHOVERSE,
    'founders-frame': FOUNDERS_FRAME,
}

export const emailThemeFor = (community: string) => EMAIL_THEMES[community] ?? ECHOVERSE
