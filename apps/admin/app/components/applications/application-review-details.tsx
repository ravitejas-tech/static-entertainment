import { ProfileDetails } from '~/components/members/profile-details'
import { DetailList } from '~/components/ui/detail-list'
import { Subsection } from '~/components/ui/subsection'
import { Text } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'
import { APPLICATIONS_COPY } from '~/data/applications/copy'
import { PROFILE_COPY } from '~/data/members/copy'
import { applicantProfile } from '~/lib/applications'
import { formatDateTime } from '~/lib/format'
import { answerItems } from '~/lib/order-summary'
import type { Application } from '~/types/applications'
import type { Json } from '~/types/database'

const { dialog, columns } = APPLICATIONS_COPY

export interface ApplicationReviewDetailsProps {
    application: Application
    questions: Json
}

export function ApplicationReviewDetails({ application, questions }: ApplicationReviewDetailsProps) {
    const profile = applicantProfile(application)
    const answers = answerItems(questions, application.answers)

    return (
        <div className='space-y-6'>
            <Subsection title={dialog.contact}>
                <DetailList
                    items={[
                        {
                            label: columns.email,
                            value: <TextLink href={`mailto:${application.email}`}>{application.email}</TextLink>,
                        },
                        {
                            label: columns.phone,
                            value: <TextLink href={`tel:${application.phone}`}>{application.phone}</TextLink>,
                        },
                        { label: columns.seat, value: application.ticket_types.name },
                        { label: columns.applied, value: formatDateTime(application.created_at) },
                    ]}
                />
            </Subsection>
            <Subsection title={dialog.profile}>
                {profile ? (
                    <ProfileDetails profile={profile} />
                ) : (
                    <Text
                        variant='small'
                        tone='muted'>
                        {PROFILE_COPY.none}
                    </Text>
                )}
            </Subsection>
            <Subsection title={dialog.answers}>
                {answers.length > 0 ? (
                    <DetailList items={answers} />
                ) : (
                    <Text
                        variant='small'
                        tone='muted'>
                        {dialog.noAnswers}
                    </Text>
                )}
            </Subsection>
        </div>
    )
}
