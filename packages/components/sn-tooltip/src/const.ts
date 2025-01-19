// const DEFAULT_NATIVETYPE_TYPE: ButtonNativeType = ButtonNativeType.Button;

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
    RightEnd = 'right-end',
}
const DEFAULT_PLACEMENT: Placement = Placement.Top;


enum Trigger {
    Hover = 'hover',
    Click = 'click',
    Focus = 'focus',
    Contextmenu = 'contextmenu',
}

const DEFAULT_TRIGGER: Trigger = Trigger.Hover;

export {
    Placement,
    Trigger,
    DEFAULT_PLACEMENT,
    DEFAULT_TRIGGER,
};

