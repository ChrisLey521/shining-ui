import { Placement, Theme, Trigger } from 'constants/common';
import { POPPER_SIDE } from 'constants/popper';
import { CSSProperties } from 'vue';

type PopperTheme = Extract<Theme, 'light' | 'dark'>

interface OverlayProps {
    trigger?: Trigger
    title?: string
    theme?: PopperTheme
    content?: string
    width?: string
    placement?: Placement
    disabled?: boolean
    visible?: boolean
    offset?: number
    transition?: string
    showArrow?: boolean
    popperClass?: string
    popperStyle?: string | CSSProperties
    delayIn?: number
    delayOut?: number
    autoClose?: boolean
    tabindex?: string
    container?: string | HTMLElement
    persistent?: boolean
}

type PlacementSide = keyof typeof POPPER_SIDE

export {
    OverlayProps, PlacementSide
};
