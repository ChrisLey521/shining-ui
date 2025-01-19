import { Theme } from "constants"
import { Placement, Trigger } from "./const"

interface TooltipProps {
    container?: string | HTMLElement
    theme?: Theme
    content?: string
    rawContent?: boolean
    placement?: Placement
    fallbackPlacements?: Placement[]
    visible?: boolean
    disabled?: boolean
    offset?: number
    transition?: string
    popperOptions?: object
    delay?: number
    hasArrow?: boolean
    hideAfter?: number
    autoClose?: number
    popperClass?: string
    enterable?: boolean
    teleported?: boolean
    trigger?: Trigger
    virtualTriggering?: boolean
    virtualRef?: HTMLElement
    triggerKeys?: string[]
    persistent?: boolean
    ariaLabel?: string
}

export {
    TooltipProps
} 