<template>
    <ul
        px-0
        overflow-auto
        :style="{
            width: typeof width === 'number'
                ? `${width}px`
                : width,
            maxHeight: typeof maxHeight === 'number'
                ? `${maxHeight}px`
                : maxHeight
        }">
        <slot />
    </ul>
</template>

<script setup lang="ts">
defineProps<{
    width?: string | number
    maxHeight?: string | number
}>()
</script>