import { TextListField } from '~/components/events/details/text-list-field'
import { Panel } from '~/components/ui/panel'
import { Subsection } from '~/components/ui/subsection'
import { TextField } from '~/components/ui/text-field'
import { EVENT_FIELDS as fields, EVENT_SECTIONS, GOOD_TO_KNOW_FIELDS, GOOD_TO_KNOW_LISTS } from '~/data/events/form'
import type { EventFormValues } from '~/schemas/event'

export function GoodToKnowSection({ readOnly }: { readOnly: boolean }) {
    return (
        <Panel title={EVENT_SECTIONS.goodToKnow.title}>
            <div className='grid gap-4 sm:grid-cols-3'>
                {GOOD_TO_KNOW_FIELDS.map((name) => (
                    <TextField<EventFormValues>
                        key={name}
                        name={name}
                        label={fields[name].label}
                        placeholder={fields[name].placeholder}
                    />
                ))}
            </div>
            {GOOD_TO_KNOW_LISTS.map(({ name, copy }) => (
                <Subsection
                    key={name}
                    title={copy.title}
                    className='pt-2'>
                    <TextListField
                        name={name}
                        copy={copy}
                        readOnly={readOnly}
                    />
                </Subsection>
            ))}
        </Panel>
    )
}
