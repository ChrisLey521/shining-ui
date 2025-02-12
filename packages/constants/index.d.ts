enum Size {
    Mini = 'mini',
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

enum Theme {
    Dark = 'dark',
    Light = 'light',
    Plain = 'plain'
}

enum Variant {
    Primary = 'primary',
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Danger = 'danger',
    Default = 'default',
}

const DEFAULT_SIZE: Size = Size.Medium
const DEFAULT_VARIANT: Variant = Variant.Primary
const DEFAULT_THEME: Theme = Theme.Light

const size2height: Map<Size, string> = new Map([
    [Size.Large, 'h-40px'],
    [Size.Medium, 'h-32px'],
    [Size.Small, 'h-24px'],
    [Size.Mini, 'h-20px']
])

enum Trigger {
    Hover = 'hover',
    Click = 'click',
    Focus = 'focus',
    ContextMenu = 'contextmenu'
}

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

// z-index adapted to tailwind CSS
enum ZIndex {
    Tooltip = 'z-999',
    Overlay = 'z-1000',
    Mask = 'z-1001',
    Loading = 'z-1002'
}

export {
    DEFAULT_SIZE, DEFAULT_THEME, DEFAULT_VARIANT, Placement, Size, size2height, Theme, Trigger, Variant, ZIndex
};

