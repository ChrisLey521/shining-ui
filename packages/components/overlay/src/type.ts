import { POPPER_SIDE, PopperProps } from 'constants/popper';

interface OverlayProps extends PopperProps {
    title?: string
    content?: string
    disabled?: boolean
    visible?: boolean
    showArrow?: boolean
    delayIn?: number
    delayOut?: number
    enterable?: boolean
    persistent?: boolean
}

type PlacementSide = keyof typeof POPPER_SIDE

export {
    OverlayProps, PlacementSide
};
