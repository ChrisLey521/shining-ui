<template>
    <ul
        px-0
        overflow-auto
        :style="{
            maxHeight: typeof maxHeight === 'number'
                ? `${maxHeight}px`
                : maxHeight
        }">
        <slot />
    </ul>
</template>

<script setup lang="ts">
defineProps<{
    maxHeight?: number | string
}>()
</script>