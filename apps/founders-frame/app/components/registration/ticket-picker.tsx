import { TicketRow } from '~/components/registration/ticket-row'
import { Reveal, type RevealTrigger } from '~/components/ui/reveal'
import type { RegistrationOption } from '~/types/events'

export interface TicketPickerProps {
    options: RegistrationOption[]
    quantityOf: (option: RegistrationOption) => number
    canAdd: (option: RegistrationOption) => boolean
    onChange: (option: RegistrationOption, delta: 1 | -1) => void
    trigger?: RevealTrigger
    order?: number
}

export function TicketPicker({ options, quantityOf, canAdd, onChange, trigger, order = 0 }: TicketPickerProps) {
    return (
        <ul className='space-y-3'>
            {options.map((option, index) => (
                <li key={option.id}>
                    <Reveal
                        effect='lift'
                        trigger={trigger}
                        order={order + index}>
                        <TicketRow
                            option={option}
                            quantity={quantityOf(option)}
                            canAdd={canAdd(option)}
                            onChange={(delta) => onChange(option, delta)}
                        />
                    </Reveal>
                </li>
            ))}
        </ul>
    )
}
