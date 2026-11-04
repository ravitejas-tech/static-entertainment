import { ProfileDetails } from '~/components/members/profile-details'
import { Panel } from '~/components/ui/panel'
import { PROFILE_COPY } from '~/data/members/copy'
import { useMemberProfile } from '~/hooks/members/queries'

export function MemberProfile({ customerId }: { customerId: string }) {
    const { data: profile } = useMemberProfile({ variables: customerId })

    if (!profile) return null

    return (
        <Panel title={PROFILE_COPY.title}>
            <ProfileDetails profile={profile} />
        </Panel>
    )
}
