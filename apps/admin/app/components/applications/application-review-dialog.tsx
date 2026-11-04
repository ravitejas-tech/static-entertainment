import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { ApplicationReviewDetails } from '~/components/applications/application-review-details'
import { ApplicationStatusBadge } from '~/components/applications/application-status-badge'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Notice } from '~/components/ui/notice'
import { Subsection } from '~/components/ui/subsection'
import { Text } from '~/components/ui/text'
import { TextField } from '~/components/ui/text-field'
import { APPLICATIONS_COPY } from '~/data/applications/copy'
import { REVIEW_DECISIONS } from '~/data/applications/status'
import { useReviewApplication } from '~/hooks/applications/mutations'
import { useCan } from '~/hooks/staff/use-can'
import { isClosed } from '~/lib/applications'
import { formatDateTime } from '~/lib/format'
import { reviewNoteSchema, type ReviewNoteValues } from '~/schemas/application-review'
import type { Application } from '~/types/applications'
import type { Json } from '~/types/database'

const { dialog, note } = APPLICATIONS_COPY

export interface ApplicationReviewDialogProps {
    application: Application
    questions: Json
    onClose: () => void
}

export function ApplicationReviewDialog({ application, questions, onClose }: ApplicationReviewDialogProps) {
    const canReview = useCan('reviewApplications')
    const editable = canReview && !isClosed(application.status)
    const { mutate, isPending } = useReviewApplication()
    const form = useForm<ReviewNoteValues>({
        resolver: zodResolver(reviewNoteSchema),
        defaultValues: { note: application.review_note },
    })
    const decisions = REVIEW_DECISIONS.filter(({ status }) => status !== application.status)

    return (
        <Dialog
            open
            onClose={onClose}
            title={dialog.title(application.name)}
            description={
                application.reviewed_at ? dialog.reviewedAt(formatDateTime(application.reviewed_at)) : undefined
            }
            footer={
                <>
                    <Button
                        variant='ghost'
                        onClick={onClose}>
                        {dialog.close}
                    </Button>
                    {editable &&
                        decisions.map(({ status, label, variant }) => (
                            <Button
                                key={status}
                                variant={variant}
                                disabled={isPending}
                                onClick={form.handleSubmit((values) =>
                                    mutate(
                                        { applicationId: application.id, name: application.name, status, ...values },
                                        { onSuccess: onClose },
                                    ),
                                )}>
                                {isPending ? dialog.saving : label}
                            </Button>
                        ))}
                </>
            }>
            <div className='space-y-6'>
                <ApplicationStatusBadge status={application.status} />
                {!canReview && <Notice tone='cyan'>{dialog.readOnly}</Notice>}
                {canReview && isClosed(application.status) && <Notice tone='cyan'>{dialog.closed}</Notice>}
                <ApplicationReviewDetails
                    application={application}
                    questions={questions}
                />
                {!editable && application.review_note && (
                    <Subsection title={note.label}>
                        <Text variant='small'>{application.review_note}</Text>
                    </Subsection>
                )}
                {editable && (
                    <FormProvider {...form}>
                        <form
                            noValidate
                            onSubmit={(event) => event.preventDefault()}
                            className='space-y-2'>
                            <TextField<ReviewNoteValues>
                                name='note'
                                label={note.label}
                                hint={note.hint}
                                multiline
                                rows={3}
                            />
                            <Text
                                variant='small'
                                tone='muted'>
                                {dialog.emailNote}
                            </Text>
                        </form>
                    </FormProvider>
                )}
            </div>
        </Dialog>
    )
}
