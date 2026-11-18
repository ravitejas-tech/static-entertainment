import { Select } from '~/components/ui/select'
import { SHELL_COPY } from '~/data/layout/navigation'
import { useCommunity } from '~/hooks/communities/use-community'

export function CommunitySwitcher() {
    const { slug, communities, select } = useCommunity()

    return (
        <Select
            aria-label={SHELL_COPY.switchCommunity}
            value={slug}
            onChange={(event) => select(event.target.value)}
            options={communities.map(({ slug: value, name: label }) => ({ value, label }))}
        />
    )
}
