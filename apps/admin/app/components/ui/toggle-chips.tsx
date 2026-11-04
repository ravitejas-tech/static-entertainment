import { Text } from '~/components/ui/text'
import type { SelectOption } from '~/components/ui/select'
import { SEGMENT_STATE_CLASSES, TOGGLE_CHIP_CLASS } from '~/data/ui/segments'
import { cn } from '~/lib/utils'

export interface ToggleChipsProps {
    options: readonly SelectOption[]
    value: readonly string[]
    onChange: (value: string[]) => void
}

export function ToggleChips({ options, value, onChange }: ToggleChipsProps) {
    return (
        <div className='flex flex-wrap gap-2'>
            {options.map((option) => {
                const selected = value.includes(option.value)
                return (
                    <button
                        key={option.value}
                        type='button'
                        aria-pressed={selected}
                        onClick={() =>
                            onChange(
                                selected ? value.filter((item) => item !== option.value) : [...value, option.value],
                            )
                        }
                        className={cn(TOGGLE_CHIP_CLASS, SEGMENT_STATE_CLASSES[selected ? 'active' : 'idle'])}>
                        <Text
                            as='span'
                            variant='label'
                            tone='inherit'>
                            {option.label}
                        </Text>
                    </button>
                )
            })}
        </div>
    )
}
