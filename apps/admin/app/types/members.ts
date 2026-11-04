import type { getMemberProfile } from '~/services/members'

export type MemberProfile = NonNullable<Awaited<ReturnType<typeof getMemberProfile>>>
