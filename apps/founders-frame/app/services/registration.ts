import {
    confirmApplicationResultSchema,
    createOrderResultSchema,
    submitApplicationResultSchema,
} from '~/schemas/functions'
import { invokeFunction } from '~/services/functions'
import type { ApplicationRequest, RsvpRequest } from '~/types/registration'

export const createRsvp = (request: RsvpRequest) => invokeFunction('create-order', request, createOrderResultSchema)

export const submitApplication = (request: ApplicationRequest) =>
    invokeFunction('submit-application', request, submitApplicationResultSchema)

export const confirmApplication = (accessToken: string) =>
    invokeFunction('confirm-application', { accessToken }, confirmApplicationResultSchema)
