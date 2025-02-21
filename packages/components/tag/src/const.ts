import { Theme, Variant } from 'constants/common'

const widthBorder = 'b b-solid'

const darkColorMap = new Map([
    [Variant.Primary, ['bg-[var(--primary-5)]', 'text-white', 'b-[var(--primary-5)]']],
    [Variant.Info, ['bg-[var(--info-5)]', 'text-white', 'b-[var(--info-5)]']],
    [Variant.Success, ['bg-[var(--success-5)]', 'text-white', 'b-[var(--success-5)]']],
    [Variant.Warning, ['bg-[var(--warning-5)]', 'text-white', 'b-[var(--warning-5)]']],
    [Variant.Danger, ['bg-[var(--danger-5)]', 'text-white', 'b-[var(--danger-5)]']],
])
const lightColorMap = new Map([
    [Variant.Primary, ['bg-[var(--primary-2)]', 'text-[var(--primary-5)]', 'b-[var(--primary-5)]']],
    [Variant.Info, ['bg-[var(--info-2)]', 'text-[var(--info-5)]', 'b-[var(--info-5)]']],
    [Variant.Success, ['bg-[var(--success-2)]', 'text-[var(--success-5)]', 'b-[var(--success-5)]']],
    [Variant.Warning, ['bg-[var(--warning-2)]', 'text-[var(--warning-5)]', 'b-[var(--warning-5)]']],
    [Variant.Danger, ['bg-[var(--danger-2)]', 'text-[var(--danger-5)]', 'b-[var(--danger-5)]']],
])
const plainColorMap = new Map([
    [Variant.Primary, ['bg-white', 'text-[var(--primary-5)]', 'b-[var(--primary-5)]']],
    [Variant.Info, ['bg-white', 'text-[var(--info-5)]', 'b-[var(--info-5)]']],
    [Variant.Success, ['bg-white', 'text-[var(--success-5)]', 'b-[var(--success-5)]']],
    [Variant.Warning, ['bg-white', 'text-[var(--warning-5)]', 'b-[var(--warning-5)]']],
    [Variant.Danger, ['bg-white', 'text-[var(--danger-5)]', 'b-[var(--danger-5)]']],
])
const colorMap = new Map<`${Theme}`, Map<`${Variant}`, string[]>>([
    [Theme.Dark, darkColorMap],
    [Theme.Light, lightColorMap],
    [Theme.Plain, plainColorMap]
])

export { colorMap, darkColorMap, lightColorMap, plainColorMap, widthBorder }

