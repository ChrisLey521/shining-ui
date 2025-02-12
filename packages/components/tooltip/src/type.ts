import { PopperProps } from 'constants/popper';

interface OverlayProps extends PopperProps {
    title?: string
    content?: string
    disabled?: boolean
    visible?: boolean
    showArrow?: boolean
    delayIn?: number
    delayOut?: number
    persistent?: boolean
}

export {
    OverlayProps
};
