import { DirectiveBinding, VNode } from 'vue'
import { Theme } from '../../../constants'
import { Placement, Trigger } from './const'

type TooltipContent = string | number | VNode

interface TooltipProps {
    visible?: boolean
    container?: string | HTMLElement
    theme?: Extract<Theme, 'light' | 'dark'>
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

type TooltipEvent = 'mouseenter' | 'mouseleave' | 'focus' | 'blur' | 'click'

enum TooltipAction {
    Show,
    Hide,
    Toggle,
    ClickOutside
}

type TooltipValue = TooltipProps | string | number

type TooltipBinding = DirectiveBinding<TooltipValue>

const isTooltipProps = (options: TooltipValue): options is TooltipProps =>
    !['string', 'number', 'undefined'].includes(typeof options)

export {
    isTooltipProps, TooltipAction, TooltipBinding, TooltipContent, TooltipEvent, TooltipProps, TooltipValue
}

