import { FloatingProps, POPPER_SIDE } from 'constants/floating';
import { CSSProperties } from 'vue';

interface OverlayProps extends FloatingProps {
    title?: string
    content?: string
    contentAsHtml?: boolean
    disabled?: boolean
    visible?: boolean
    showArrow?: boolean
    delay?: number
    enterable?: boolean
    persistent?: boolean
    floatingClass?: string
    floatingStyles?: string | CSSProperties
}

type PlacementSide = keyof typeof POPPER_SIDE

export {
    OverlayProps, PlacementSide
};
