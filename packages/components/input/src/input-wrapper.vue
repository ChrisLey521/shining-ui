<template>
    <div
        :class="[
            minHeight,
            'group/input__wrapper',
            {
                'relative z-1 bg-gray-1 cursor-not-allowed': disabled
            }
        ]"
        flex
        flex-row
        flex-wrap
        gap-1
        items-center
        w-full
        px-2
        py-1
        b
        b-solid
        b-gray-3
        rounded
        focus-within:b-blue-5
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { DEFAULT_SIZE, Size, size2minHeight } from 'constants/common';

const {
    size = DEFAULT_SIZE,
} = defineProps<{
    size?: `${Size}`
    disabled?: boolean
}>()

const minHeight = size2minHeight.get(size)
</script>