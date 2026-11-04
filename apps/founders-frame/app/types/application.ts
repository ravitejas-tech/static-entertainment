import type { z } from 'zod'
import type { applicationSchema } from '~/schemas/application'
import type { Enums } from '~/types/database'

export type Application = z.infer<typeof applicationSchema>

export type ApplicationStatus = Enums<'application_status'>
