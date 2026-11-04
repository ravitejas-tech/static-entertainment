import { z } from 'zod'
import { APPLICATIONS_COPY } from '~/data/applications/copy'
import { NOTE_MAX_LENGTH } from '~/data/applications/status'

export const reviewNoteSchema = z.object({
    note: z.string().trim().max(NOTE_MAX_LENGTH, APPLICATIONS_COPY.errors.noteLong),
})

export type ReviewNoteValues = z.infer<typeof reviewNoteSchema>
