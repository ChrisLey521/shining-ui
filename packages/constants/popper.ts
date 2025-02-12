import { VNode } from 'vue'
import { DEFAULT_PLACEMENT, Trigger } from '../components/node_modules/constants/common'
import { Placement, Theme } from './common'

type TooltipContent = string | number | VNode
type PopperTheme = Extract<Theme, 'light' | 'dark'>

interface TooltipProps {
    visible?: boolean
    container?: string | HTMLElement
    theme?: PopperTheme
    content?: TooltipContent
    contentAsHTML?: boolean
    contentAsComponent?: boolean
    placement?: Placement
    allowedPlacements?: Placement[]
    disabled?: boolean
    offset?: number
    transition?: string
    showArrow?: boolean
    autoClose?: number
    enterable?: boolean
    trigger?: Trigger
    triggerKeys?: string[]
    persistent?: boolean
    class?: string
    delay?: number
    showOnEllipses?: boolean
}

const DEFAULT_TOOLTIP_PROPS: TooltipProps = {
    visible: void 0,
    trigger: Trigger.Hover,
    container: 'body',
    offset: 10,
    showOnEllipses: false,
    placement: DEFAULT_PLACEMENT,
    disabled: false
}

const POPPER_SIDE = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
}

const overlayBgMap = new Map<Theme.Dark | Theme.Light, string[]>([
    [Theme.Dark, ['bg-dark-5', 'text-white', 'b-gray-6']],
    [Theme.Light, ['bg-white', 'text-gray-9', 'b-gray-2']]
])

const tooltipBgMap = new Map<TooltipProps['theme'], string[]>([
    [Theme.Dark, ['bg-dark-5', 'text-white', 'b-gray-6']],
    [Theme.Light, ['bg-white', 'text-blue', 'b-gray-2']]
])

export { DEFAULT_TOOLTIP_PROPS, overlayBgMap, POPPER_SIDE, tooltipBgMap, type TooltipProps }

