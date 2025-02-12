<script setup lang="ts">
import { computed } from 'vue';
import { iconDict } from './const';
import { SnIconProps } from './type';
const {
    name,
    size,
    color
} = defineProps<SnIconProps>()
const fontSize = computed(() => typeof size === 'string'
    ? size
    : `${size}px`
)
</script>


<template>
    <i :class="iconDict[name]" :style="{ color, fontSize }" />
</template>