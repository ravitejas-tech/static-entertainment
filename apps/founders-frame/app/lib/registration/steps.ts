import type { FormStep } from '~/types/registration'

const STEPS: FormStep[] = ['tickets', 'personal', 'role', 'company']

export function formSteps(questionCount: number): FormStep[] {
    return questionCount > 0 ? [...STEPS, 'questions'] : STEPS
}
