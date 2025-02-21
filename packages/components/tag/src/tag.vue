<script setup lang="ts">
import { DEFAULT_SIZE, DEFAULT_THEME, DEFAULT_VARIANT, size2height } from "constants/common";
import { computed } from "vue";
import { colorMap, widthBorder } from './const';
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

const colors = computed<string[]>(() => [
    ...(colorMap.get(theme)?.get(variant) ?? []),
    widthBorder
]);

const height = computed<string>(() => size2height.get(size))
</script>

<template>
    <span
        :draggable="draggable ? 'true' : 'false'"
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
