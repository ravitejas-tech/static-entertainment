import { QUESTION_INPUTS } from '~/data/registration/questions'
import type { EventQuestion } from '~/types/events'

export function questionOptions({ kind, options }: EventQuestion) {
    return options?.length ? options : (QUESTION_INPUTS[kind].options ?? [])
}

export function isSelectQuestion(question: EventQuestion) {
    return questionOptions(question).length > 0
}
