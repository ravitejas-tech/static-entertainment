import { JourneyCheckInScreen } from '~/components/landing/journey/screens/check-in'
import { JourneyPaymentScreen } from '~/components/landing/journey/screens/payment'
import { JourneyTicketScreen } from '~/components/landing/journey/screens/ticket'
import { JourneyTicketsScreen } from '~/components/landing/journey/screens/tickets'
import { BrandEmblem } from '~/components/ui/brand-emblem'
import { StackedPane } from '~/components/ui/stacked-pane'
import { Text } from '~/components/ui/text'
import { BRAND_NAME } from '~/data/brand'

const SCREENS = [
    { key: 'tickets', Screen: JourneyTicketsScreen },
    { key: 'payment', Screen: JourneyPaymentScreen },
    { key: 'ticket', Screen: JourneyTicketScreen },
    { key: 'check-in', Screen: JourneyCheckInScreen },
] as const

export function JourneyPhone({ active }: { active: number }) {
    return (
        <div
            aria-hidden
            className='pointer-events-none w-64 rounded-4xl bg-ink p-2 shadow-dialog sm:w-68'>
            <div className='flex h-128 flex-col overflow-clip rounded-3xl bg-bg sm:h-136'>
                <div className='flex items-center gap-2 px-4 pt-5 pb-3'>
                    <BrandEmblem className='h-5' />
                    <Text
                        as='span'
                        variant='label'>
                        {BRAND_NAME}
                    </Text>
                </div>
                <div className='grid flex-1 px-3.5 pb-4'>
                    {SCREENS.map(({ key, Screen }, index) => (
                        <StackedPane
                            key={key}
                            active={index === active}
                            className='flex flex-col gap-3'>
                            <Screen />
                        </StackedPane>
                    ))}
                </div>
            </div>
        </div>
    )
}
