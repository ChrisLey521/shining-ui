import { CSSProperties, VNode } from 'vue'
import { DEFAULT_PLACEMENT, Placement, Theme, Trigger } from './common'

interface FloatingProps {
    trigger?: `${Trigger}`
    theme?: `${PopperTheme}`
    placement?: `${Placement}`
    offset?: number
    transition?: string
    width?: string
    popperClass?: string
    popperStyle?: string | CSSProperties
    delayIn?: number
    delayOut?: number
    autoClose?: number
    tabindex?: string
    delay?: number
    container?: string | HTMLElement
}

type TooltipContent = string | number | VNode

enum PopperTheme {
    Dark = Theme.Dark,
    Light = Theme.Light
}

interface TooltipProps extends FloatingProps {
    visible?: boolean
    content?: TooltipContent
    contentAsHtml?: boolean
    contentAsComponent?: boolean
    allowedPlacements?: Placement[]
    disabled?: boolean
    showArrow?: boolean
    enterable?: boolean
    triggerKeys?: string[]
    persistent?: boolean
    showOnEllipses?: boolean
    floatingClass?: string
    floatingStyles?: string | CSSProperties
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

const overlayBgMap = new Map<`${PopperTheme}`, string[]>([
    [PopperTheme.Dark, ['bg-dark-5', 'text-white', 'b-gray-6']],
    [PopperTheme.Light, ['bg-white', 'text-gray-9', 'b-gray-2']]
])

const tooltipBgMap = new Map<`${PopperTheme}`, string[]>([
    [PopperTheme.Dark, ['bg-dark-5', 'text-white', 'b-gray-6']],
    [PopperTheme.Light, ['bg-white', 'text-blue', 'b-gray-2']]
])

export { DEFAULT_TOOLTIP_PROPS, overlayBgMap, POPPER_SIDE, PopperTheme, tooltipBgMap, type FloatingProps, type TooltipProps }

