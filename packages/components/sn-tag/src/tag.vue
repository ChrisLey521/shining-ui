<script setup lang="ts">
    import { computed, defineProps } from "vue";
import { DEFAULT_SIZE, DEFAULT_THEME, DEFAULT_VARIANT, Size, Theme, Variant } from "../../type";
    interface TagProps {
        variant?: Variant;
        closable?: boolean;
        "disable-transitions"?: boolean;
        hit?: boolean;
        color?: string;
        border?: string;
        background?: string;
        size?: Size;
        round?: boolean;
        theme?: Theme;
        onClose?: () => void
    }

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

    const height = computed<string>(() => {
        const size2height = new Map([
            [Size.Large, 'h-32px'],
            [Size.Medium, 'h-24px'],
            [Size.Small, 'h-20px'],
            [Size.Mini, 'h-16px']
        ])
        return size2height.get(size)
    })
</script>

<template>
    <div
        :style="{ background, color, border }"
        :class="[
            {
                'rounded-full': round,
                rounded: !round,
            },
            'relative',
            'px-12px',
            'w-fit',
            'text-xs',
            'flex',
            'gap-4px',
            'justify-between',
            'items-center',
            ...colors,
            height
        ]">
        <div>
            <slot />
        </div>
        <div
            v-if="closable"
            class="group text-sm"
            @click.stop="$emit('close')">
            <i class="i-material-symbols:close-small-outline block group-hover:hidden"/>
            <i class="i-material-symbols:cancel hidden group-hover:block" />
        </div>
    </div>
</template>
