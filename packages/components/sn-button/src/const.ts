// const DEFAULT_NATIVETYPE_TYPE: ButtonNativeType = ButtonNativeType.Button;

import { Size, Variant } from "constants";

enum ButtonNativeType {
    Button = 'button',
    Submit = 'submit',
    Reset = 'reset',
}

const sizeMap: Map<Size, string[]> = new Map<Size, string[]>([
    [Size.Large, ['w-40px', 'text-lg', 'h-40px']],
    [Size.Medium, ['w-32px', 'text-base', 'h-32px']],
    [Size.Small, ['w-24px', 'text-sm', 'h-24px']],
    [Size.Mini, ['w-20px', 'text-xs', 'h-20px']],
]);

const paddingMap: Map<Size, string[]> = new Map<Size, string[]>([
    [Size.Large, ['px-20px', 'py-10px']],
    [Size.Medium, ['px-16px', 'py-8px']],
    [Size.Small, ['px-12px', 'py-6px']],
    [Size.Mini, ['px-10px', 'py-4px']],
]);

const lightVariantStyles: Record<Variant, Record<'default' | 'text' | 'plain' | 'link', string[]>> = {
    [Variant.Primary]: {
        default: ['bg-blue-5/90', 'text-white', 'hover:bg-blue-5/80', 'active:bg-blue-5'],
        text: ['text-blue-5/90', 'bg-transparent', 'hover:bg-gray-1', 'active:bg-gray-2/80'],
        plain: ['bg-blue-5/10', 'text-blue-5', 'border', 'border-solid', 'border-blue-3', 'hover:bg-blue-5/80', 'hover:text-white', 'active:bg-blue-5', 'active:text-white'],
        link: ['text-blue-5/90', 'bg-transparent', 'hover:text-blue-5/70', 'active:text-blue-6'],
    },
    [Variant.Success]: {
        default: ['bg-green-5/90', 'text-white', 'hover:bg-green-5/80', 'active:bg-green-5'],
        text: ['text-green-5/90', 'bg-transparent', 'hover:bg-gray-1', 'active:bg-gray-2/80'],
        plain: ['bg-green-5/10', 'text-green-5', 'border', 'border-solid', 'border-green-3', 'hover:bg-green-5/80', 'hover:text-white', 'active:bg-green-5', 'active:text-white'],
        link: ['text-green-5/90', 'bg-transparent', 'hover:text-green-5/70', 'active:text-green-6'],
    },
    [Variant.Warning]: {
        default: ['bg-orange-5/90', 'text-white', 'hover:bg-orange-5/80', 'active:bg-orange-5'],
        text: ['text-orange-5/90', 'bg-transparent', 'hover:bg-gray-1', 'active:bg-gray-2/80'],
        plain: ['bg-orange-5/10', 'text-orange-5', 'border', 'border-solid', 'border-orange-3', 'hover:bg-orange-5/80', 'hover:text-white', 'active:bg-orange-5', 'active:text-white'],
        link: ['text-orange-5/90', 'bg-transparent', 'hover:text-orange-5/70', 'active:text-orange-6'],
    },
    [Variant.Danger]: {
        default: ['bg-red-5/90', 'text-white', 'hover:bg-red-5/80', 'active:bg-red-5'],
        text: ['text-red-5/90', 'bg-transparent', 'hover:bg-gray-1', 'active:bg-gray-2/80'],
        plain: ['bg-red-5/10', 'text-red-5', 'border', 'border-solid', 'border-red-3', 'hover:bg-red-5/80', 'hover:text-white', 'active:bg-red-5', 'active:text-white'],
        link: ['text-red-5/90', 'bg-transparent', 'hover:text-red-5/70', 'active:text-red-6'],
    },
    [Variant.Info]: {
        default: ['bg-gray-5/90', 'text-white', 'hover:bg-gray-5/80', 'active:bg-gray-5'],
        text: ['text-gray-5/90', 'bg-transparent', 'hover:bg-gray-1', 'active:bg-gray-2/80'],
        plain: ['bg-gray-5/10', 'text-gray-5', 'border', 'border-solid', 'border-gray-3', 'hover:bg-gray-5/80', 'hover:text-white', 'active:bg-gray-5', 'active:text-white'],
        link: ['text-gray-5/70', 'bg-transparent', 'hover:text-gray-5/50', 'active:text-gray-5'],
    },
    [Variant.Default]: {
        default: ['bg-white', 'text-gray-5', 'border', 'border-solid', 'border-gray-3', 'hover:text-blue-4', 'hover:bg-blue-50', 'hover:border-blue-2', 'active:border-blue-3',],
        text: ['text-gray-5', 'hover:text-blue-5/90', 'bg-transparent', 'hover:bg-gray-1', 'active:bg-gray-2/80'],
        plain: ['bg-white', 'text-gray-5', 'border', 'border-solid', 'border-gray-3', 'hover:text-blue-4', 'hover:border-blue-2', 'active:border-blue-3'],
        link: ['text-gray-5/90', 'bg-transparent', 'hover:text-gray-5/70', 'active:text-gray-6'],
    },
};

const darkVariantStyles: Record<Variant, Record<'default' | 'text' | 'plain' | 'link', string[]>> = {
    [Variant.Primary]: {
        default: ['bg-blue-5/90', 'text-white', 'hover:bg-blue-5/80', 'active:bg-blue-5'],
        text: ['text-blue-5/90', 'bg-transparent', 'hover:bg-neutral-8', 'active:bg-neutral-7'],
        plain: ['bg-blue-5/10', 'text-blue-5', 'border', 'border-solid', 'border-blue-3', 'hover:bg-blue-5/80', 'hover:text-white', 'active:bg-blue-5', 'active:text-white'],
        link: ['text-blue-5/90', 'bg-transparent', 'hover:text-blue-5/70', 'active:text-blue-6'],
    },
    [Variant.Success]: {
        default: ['bg-green-5/90', 'text-white', 'hover:bg-green-5/80', 'active:bg-green-5'],
        text: ['text-green-5/90', 'bg-transparent', 'hover:bg-neutral-8', 'active:bg-neutral-7'],
        plain: ['bg-green-5/10', 'text-green-5', 'border', 'border-solid', 'border-green-3', 'hover:bg-green-5/80', 'hover:text-white', 'active:bg-green-5', 'active:text-white'],
        link: ['text-green-5/90', 'bg-transparent', 'hover:text-green-5/70', 'active:text-green-6'],
    },
    [Variant.Warning]: {
        default: ['bg-orange-5/90', 'text-white', 'hover:bg-orange-5/80', 'active:bg-orange-5'],
        text: ['text-orange-5/90', 'bg-transparent', 'hover:bg-neutral-8', 'active:bg-neutral-7'],
        plain: ['bg-orange-5/10', 'text-orange-5', 'border', 'border-solid', 'border-orange-3', 'hover:bg-orange-5/80', 'hover:text-white', 'active:bg-orange-5', 'active:text-white'],
        link: ['text-orange-5/90', 'bg-transparent', 'hover:text-orange-5/70', 'active:text-orange-6'],
    },
    [Variant.Danger]: {
        default: ['bg-red-5/90', 'text-white', 'hover:bg-red-5/80', 'active:bg-red-5'],
        text: ['text-red-5/90', 'bg-transparent', 'hover:bg-neutral-8', 'active:bg-neutral-7'],
        plain: ['bg-red-5/10', 'text-red-5', 'border', 'border-solid', 'border-red-3', 'hover:bg-red-5/80', 'hover:text-white', 'active:bg-red-5', 'active:text-white'],
        link: ['text-red-5/90', 'bg-transparent', 'hover:text-red-5/70', 'active:text-red-6'],
    },
    [Variant.Info]: {
        default: ['bg-gray-5/90', 'text-white', 'hover:bg-gray-5/80', 'active:bg-gray-5'],
        text: ['text-gray-5/90', 'bg-transparent', 'hover:bg-neutral-8', 'active:bg-neutral-7'],
        plain: ['bg-gray-5/10', 'text-gray-5', 'border', 'border-solid', 'border-gray-3', 'hover:bg-gray-5/80', 'hover:text-white', 'active:bg-gray-5', 'active:text-white'],
        link: ['text-gray-5/70', 'bg-transparent', 'hover:text-gray-5/50', 'active:text-gray-5'],
    },
    [Variant.Default]: {
        default: ['bg-neutral-8', 'text-gray-2', 'border', 'border-solid', 'border-gray-3', 'hover:text-blue-4', 'hover:bg-sky-950/50', 'hover:border-blue-2', 'active:text-blue-4', 'active:bg-sky-950/50', 'active:border-blue-5',],
        text: ['text-gray-2', 'bg-transparent', 'hover:bg-neutral-8', 'active:bg-neutral-7'],
        plain: ['bg-transparent', 'text-gray-5', 'border', 'border-solid', 'border-gray-3', 'hover:text-blue-4', 'hover:border-blue-2', 'active:border-blue-3'],
        link: ['text-gray-5/90', 'bg-transparent', 'hover:text-gray-5/70', 'active:text-gray-6'],
    },
};

const DEFAULT_BUTTON_VARIANT: Variant = Variant.Default

export {
    ButtonNativeType, darkVariantStyles, DEFAULT_BUTTON_VARIANT, lightVariantStyles, paddingMap, sizeMap
};

