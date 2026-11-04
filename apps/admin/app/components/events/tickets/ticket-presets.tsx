import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { TICKETS_COPY } from '~/data/events/tickets'
import { priceLabel } from '~/lib/events/tickets'
import type { TicketPreset } from '~/types/ticket-types'

export interface TicketPresetsProps {
    presets: readonly TicketPreset[]
    onPick: (preset: TicketPreset) => void
}

export function TicketPresets({ presets, onPick }: TicketPresetsProps) {
    return (
        <Panel title={TICKETS_COPY.quickStart}>
            <Text
                variant='small'
                tone='secondary'>
                {TICKETS_COPY.quickStartLead}
            </Text>
            <div className='grid gap-2 sm:flex sm:flex-wrap'>
                {presets.map((preset) => (
                    <Button
                        key={preset.name}
                        variant='secondary'
                        size='sm'
                        className='justify-start'
                        onClick={() => onPick(preset)}>
                        <Plus />
                        {`${preset.name} · ${priceLabel(preset.price)}`}
                    </Button>
                ))}
            </div>
        </Panel>
    )
}
