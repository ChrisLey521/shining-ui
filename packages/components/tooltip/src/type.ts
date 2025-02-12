import { Placement, Theme, Trigger } from 'constants/common';
import { CSSProperties } from 'vue';
import { side } from './const';

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

type PlacementSide = keyof typeof side

export {
    OverlayProps, PlacementSide
};
