import { TooltipProps } from 'constants/floating'
import { DirectiveBinding } from 'vue'


type TooltipEvent = 'mouseenter' | 'mouseleave' | 'focus' | 'blur' | 'click'

enum TooltipAction {
    Show,
    Hide,
    Toggle,
    ClickOutside,
    ContextMenu
}

type TooltipValue = TooltipProps | string | number

type TooltipBinding = DirectiveBinding<TooltipValue>

const isTooltipProps = (options: TooltipValue): options is TooltipProps =>
    !['string', 'number', 'undefined'].includes(typeof options)

export {
    isTooltipProps, TooltipAction, TooltipBinding, TooltipEvent, TooltipValue
}

