import { Panel } from '~/components/ui/panel'
import { ToggleChipsField } from '~/components/ui/toggle-chips-field'
import { AUDIENCE_FIELDS } from '~/data/events/audience'
import { EVENT_SECTIONS } from '~/data/events/form'
import type { EventFormValues } from '~/schemas/event'

export function AudienceSection() {
    return (
        <Panel title={EVENT_SECTIONS.audience.title}>
            {AUDIENCE_FIELDS.map(({ name, label, hint, options }) => (
                <ToggleChipsField<EventFormValues>
                    key={name}
                    name={name}
                    label={label}
                    hint={hint}
                    options={options}
                />
            ))}
        </Panel>
    )
}
