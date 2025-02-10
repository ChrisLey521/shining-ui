<script setup lang="ts">
import { DEFAULT_SIZE, DEFAULT_THEME, DEFAULT_VARIANT, size2height, Theme, Variant } from "constants";
import { computed } from "vue";
import { TagProps } from './type';

const {
    variant = DEFAULT_VARIANT,
    closable = false,
    // "disable-transitions": disableTransitions = true,
    // hit = false,
    color,
    background,
    border,
    size = DEFAULT_SIZE,
    round = false,
    theme = DEFAULT_THEME,
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
    const plainColorMap = new Map([
        [Variant.Primary, ['bg-white', 'text-[var(--primary-5)]', 'border-[var(--primary-5)]']],
        [Variant.Info, ['bg-white', 'text-[var(--info-5)]', 'border-[var(--info-5)]']],
        [Variant.Success, ['bg-white', 'text-[var(--success-5)]', 'border-[var(--success-5)]']],
        [Variant.Warning, ['bg-white', 'text-[var(--warning-5)]', 'border-[var(--warning-5)]']],
        [Variant.Danger, ['bg-white', 'text-[var(--danger-5)]', 'border-[var(--danger-5)]']],
    ])

    const colorMap = new Map<Theme, Map<Variant, string[]>>([
        [Theme.Dark, darkColorMap],
        [Theme.Light, lightColorMap],
        [Theme.Plain, plainColorMap]
    ])

    return [
        ...(colorMap.get(theme)?.get(variant) ?? []),
        border
    ]
});

const height = computed<string>(() => size2height.get(size))
</script>

<template>
    <span
        :style="{ background, color, border }"
        :class="[
            {
                'rounded-full': round === true,
                rounded: round !== true,
            },
            'relative',
            'px-12px',
            'w-fit',
            'text-xs',
            'inline-flex',
            'gap-4px',
            'justify-between',
            'items-center',
            ...colors,
            height
        ]">
        <slot />
        <span v-if="closable" class="group text-sm" @click.stop="$emit('close')">
            <i class="i-material-symbols:close-small-outline block group-hover:hidden" />
            <i class="i-material-symbols:cancel hidden group-hover:block" />
        </span>
    </span>
</template>
