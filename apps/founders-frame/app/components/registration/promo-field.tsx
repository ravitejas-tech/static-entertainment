import { useState, type KeyboardEvent } from 'react'
import { BadgePercent, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import { CHECKOUT_COPY } from '~/data/registration/form'
import { FIELD_IDS } from '~/data/registration/page'
import { registrationErrorMessage } from '~/lib/registration/errors'

const { promo: copy } = CHECKOUT_COPY

export interface PromoFieldProps {
    applied: string | null
    checking: boolean
    error: Error | null
    onApply: (code: string) => void
    onRemove: () => void
}

export function PromoField({ applied, checking, error, onApply, onRemove }: PromoFieldProps) {
    const [draft, setDraft] = useState('')
    const code = draft.trim().toUpperCase()

    const apply = () => code && onApply(code)
    const applyOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return
        event.preventDefault()
        apply()
    }

    if (applied) {
        return (
            <div className='flex items-center justify-between gap-3 rounded-lg bg-tint-green px-4 py-3'>
                <Text
                    as='span'
                    variant='label'
                    tone='success'
                    className='flex items-center gap-2'>
                    <BadgePercent
                        className='size-5 shrink-0'
                        aria-hidden
                    />
                    {copy.applied(applied)}
                </Text>
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={onRemove}>
                    <X aria-hidden />
                    {copy.remove}
                </Button>
            </div>
        )
    }

    return (
        <Field
            id={FIELD_IDS.promo}
            label={copy.label}
            error={error ? registrationErrorMessage(error) : undefined}>
            {(control) => (
                <div className='flex gap-2'>
                    <Input
                        {...control}
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={applyOnEnter}
                        autoComplete='off'
                        autoCapitalize='characters'
                        placeholder={copy.placeholder}
                        className='flex-1'
                    />
                    <Button
                        type='button'
                        variant='secondary'
                        disabled={!code || checking}
                        onClick={apply}>
                        {checking ? copy.checking : copy.apply}
                    </Button>
                </div>
            )}
        </Field>
    )
}
