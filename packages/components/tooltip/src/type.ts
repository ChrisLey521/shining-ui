import { FloatingProps } from 'constants/floating';

interface OverlayProps extends FloatingProps {
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

