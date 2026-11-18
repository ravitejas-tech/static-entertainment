import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { PanelFrame } from '~/components/landing/panel-frame'
import { PanelTab } from '~/components/landing/panel-tab'
import { BrandEmblem } from '~/components/ui/brand-emblem'
import { Photo } from '~/components/ui/photo'
import { Text } from '~/components/ui/text'
import { HOME_EVENTS_HEADING, HOME_EVENTS_PANELS } from '~/data/landing/events'
import { CTA_PHOTO } from '~/data/landing/images'
import { PATHS } from '~/data/navigation'
import { PHOTO_SIZES } from '~/data/ui/media'

export interface MorePanelProps {
    order: number
    open: boolean
    onOpen: () => void
}

export function MorePanel({ order, open, onOpen }: MorePanelProps) {
    return (
        <PanelFrame
            order={order}
            open={open}
            onOpen={onOpen}
            backdrop={
                <Photo
                    photo={{ ...CTA_PHOTO, alt: '' }}
                    sizes={PHOTO_SIZES.cover}
                    className='opacity-20'
                />
            }
            tab={
                <PanelTab
                    title={HOME_EVENTS_PANELS.more.title}
                    marker={
                        <span className='grid w-10 shrink-0 place-items-center'>
                            <BrandEmblem className='h-9' />
                        </span>
                    }
                />
            }>
            <div className='flex h-full max-w-xl flex-col justify-end gap-4 p-5 sm:p-7 lg:justify-center lg:p-12'>
                <BrandEmblem className='h-14 self-start' />
                <Text
                    as='h3'
                    variant='heading'
                    tone='inverse'>
                    {HOME_EVENTS_PANELS.more.title}
                </Text>
                <Text tone='inverse-muted'>{HOME_EVENTS_PANELS.more.body}</Text>
                <Link
                    to={PATHS.events}
                    className='inline-flex w-fit items-center gap-1.5 text-gold after:absolute after:inset-0 hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-gold'>
                    <Text
                        as='span'
                        variant='label'
                        tone='inherit'>
                        {HOME_EVENTS_HEADING.all}
                    </Text>
                    <ArrowRight
                        className='size-4'
                        aria-hidden
                    />
                </Link>
            </div>
        </PanelFrame>
    )
}
