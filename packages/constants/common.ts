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

export {
    DEFAULT_SIZE, DEFAULT_THEME, DEFAULT_VARIANT, Size, size2height, Theme,
    Variant
};

