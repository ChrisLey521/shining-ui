<script setup lang="ts">
    import { computed, defineProps } from "vue";
import { ComponentSize, Theme, Variant } from "../../type";
    interface TagProps {
        variant?: Variant;
        closable?: boolean;
        "disable-transitions"?: boolean;
        hit?: boolean;
        color?: string;
        border?: string;
        background?: string;
        size?: ComponentSize;
        round?: boolean;
        theme?: Theme;
    }

    const {
        variant = Variant.Primary,
        // closable = false,
        // "disable-transitions": disableTransitions = true,
        // hit = false,
        color,
        background,
        border,
        // size = ComponentSize.Medium,
        round = false,
        theme = Theme.Light,
    } = defineProps<TagProps>();

    const colors = computed<string[]>(() => {
        const border = 'border border-solid'
        const darkColorMap = new Map([
            [Variant.Primary, ['bg-[var(--primary-5)]', 'text-white', 'border-[var(--primary-5)]']],
            [Variant.Info, ['bg-[var(--info-5)]', 'text-white', 'border-[var(--info-5)]']],
            [Variant.Success, ['bg-[var(--success-5)]', 'text-white', 'border-[var(--success-5)]']],
            [Variant.Warning, ['bg-[var(--warning-5)]', 'text-white', 'border-[var(--warning-5)]']],
            [Variant.Danger, ['bg-[var(--danger-5)]', 'text-white', 'border-[var(--danger-5)]']],
        ])
        const lightColorMap = new Map([
            [Variant.Primary, ['bg-[var(--primary-2)]', 'text-[var(--primary-5)]', 'border-[var(--primary-5)]']],
            [Variant.Info, ['bg-[var(--info-2)]', 'text-[var(--info-5)]', 'border-[var(--info-5)]']],
            [Variant.Success, ['bg-[var(--success-2)]', 'text-[var(--success-5)]', 'border-[var(--success-5)]']],
            [Variant.Warning, ['bg-[var(--warning-2)]', 'text-[var(--warning-5)]', 'border-[var(--warning-5)]']],
            [Variant.Danger, ['bg-[var(--danger-2)]', 'text-[var(--danger-5)]', 'border-[var(--danger-5)]']],
        ])
        const palinColorMap = new Map([
            [Variant.Primary, ['bg-white', 'text-[var(--primary-5)]', 'border-[var(--primary-5)]']],
            [Variant.Info, ['bg-white', 'text-[var(--info-5)]', 'border-[var(--info-5)]']],
            [Variant.Success, ['bg-white', 'text-[var(--success-5)]', 'border-[var(--success-5)]']],
            [Variant.Warning, ['bg-white', 'text-[var(--warning-5)]', 'border-[var(--warning-5)]']],
            [Variant.Danger, ['bg-white', 'text-[var(--danger-5)]', 'border-[var(--danger-5)]']],
        ])

        const colorMap = new Map<Theme, Map<Variant, string[]>>([
            [Theme.Dark, darkColorMap],
            [Theme.Light, lightColorMap],
            [Theme.Plain, palinColorMap]
        ])
        
        return [
            ...(colorMap.get(theme)?.get(variant) ?? []),
            border
        ]
    });
</script>

<template>
    <div :style="{ background, color, border }" :class="[
        {
            'rounded-full': round,
            rounded: !round,
        },
        'px-12px',
        'py-8px',
        'w-fit',
        'text-xs',
        ...colors
    ]">
        <slot />
    </div>
</template>
