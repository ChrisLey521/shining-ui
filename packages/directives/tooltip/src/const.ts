import { TooltipProps } from './type';

enum Placement {
    Top = 'top',
    TopStart = 'top-start',
    TopEnd = 'top-end',
    Bottom = 'bottom',
    BottomStart = 'bottom-start',
    BottomEnd = 'bottom-end',
    Left = 'left',
    LeftStart = 'left-start',
    LeftEnd = 'left-end',
    Right = 'right',
    RightStart = 'right-start',
    RightEnd = 'right-end'
}

enum Trigger {
    Hover = 'hover',
    Click = 'click',
    Focus = 'focus',
    ContextMenu = 'context-menu'
}

const DEFAULT_PLACEMENT = Placement.TopStart

const DEFAULT_TOOLTIP_PROPS: TooltipProps = {
    offset: 10,
    placement: DEFAULT_PLACEMENT
}

const tooltipZIndex = 'z-1000'

export { DEFAULT_TOOLTIP_PROPS, Placement, tooltipZIndex, Trigger };

