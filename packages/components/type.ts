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
    Danger = 'danger'
}

const DEFAULT_SIZE: Size = Size.Medium
const DEFAULT_VARIANT: Variant = Variant.Primary
const DEFAULT_THEME: Theme = Theme.Light

export {
    DEFAULT_SIZE, DEFAULT_THEME, DEFAULT_VARIANT, Size,
    Theme,
    Variant
};

