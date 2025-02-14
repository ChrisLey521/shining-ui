import { Placement, Trigger } from 'constants/common';
import { CSSProperties, VNode } from 'vue';

interface FloatingContentProps {
    content?: string | number | VNode
    contentAsHtml?: boolean
    trigger?: Trigger
    width?: string
    themeStyles?: string[]
    floatingClass?: string
    floatingStyles?: string | CSSProperties
    floatingPositionStyles?: CSSProperties
}

interface FloatingProps extends FloatingContentProps {
    visible: boolean
    virtual?: boolean
    disabled?: boolean
    showArrow?: boolean
    container?: string | HTMLElement
    placement?: Placement
    offset?: number
    enterable?: boolean
    transition?: string
    delay?: number
    referenceElement?: HTMLElement
}

interface FloatingTriggerProps {
    trigger: Trigger
    disabled?: boolean
    hasModelVisible?: boolean
    controlled?: boolean
}

export {
    FloatingContentProps, FloatingProps, FloatingTriggerProps
};

