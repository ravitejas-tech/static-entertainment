import { DetailList } from '~/components/ui/detail-list'
import { TextLink } from '~/components/ui/text-link'
import { PROFILE_COPY as copy } from '~/data/members/copy'
import { FOUNDER_STAGE_LABELS, INDUSTRY_LABELS, LOOKING_FOR_LABELS, MEMBER_TYPE_LABELS } from '~/data/members/options'
import { labelFor, labelList } from '~/lib/members'
import type { MemberProfile } from '~/types/members'

export function ProfileDetails({ profile }: { profile: MemberProfile }) {
    const { companies: company, linkedin_url: linkedin, looking_for: lookingFor } = profile

    return (
        <DetailList
            items={[
                { label: copy.memberType, value: MEMBER_TYPE_LABELS[profile.member_type] },
                { label: copy.jobTitle, value: profile.job_title || copy.none },
                { label: copy.company, value: company?.name ?? copy.none },
                {
                    label: copy.industry,
                    value: company?.industry ? labelFor(INDUSTRY_LABELS, company.industry) : copy.none,
                },
                {
                    label: copy.stage,
                    value: company?.stage ? labelFor(FOUNDER_STAGE_LABELS, company.stage) : copy.none,
                },
                {
                    label: copy.website,
                    value: company?.website ? (
                        <TextLink
                            href={company.website}
                            target='_blank'
                            rel='noopener noreferrer'>
                            {company.website}
                        </TextLink>
                    ) : (
                        copy.none
                    ),
                },
                {
                    label: copy.linkedin,
                    value: linkedin ? (
                        <TextLink
                            href={linkedin}
                            target='_blank'
                            rel='noopener noreferrer'>
                            {linkedin}
                        </TextLink>
                    ) : (
                        copy.none
                    ),
                },
                {
                    label: copy.lookingFor,
                    value:
                        lookingFor.length > 0
                            ? labelList(LOOKING_FOR_LABELS, lookingFor).join(copy.listSeparator)
                            : copy.none,
                },
            ]}
        />
    )
}
