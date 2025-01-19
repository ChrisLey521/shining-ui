<template>
    <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
        <slot />
        <div v-if="isvisible" :class="[
            'absolute',
            'text-sm',
            'border',
            'border-solid',
            'border-gray-3',
            'p-2',
            'rounded',
            'z-9'
        ]">
            <div v-html="content"></div>
            <div :class="[
                'absolute',
                'h-3',
                'w-3',
                'transform',
                'rounded',
                'rotate-45',
                'border',
                'border-solid',
                'border-gray-3',
            ]"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>

// const { content, ...restProps } = defineProps<TooltipProps>();
const { content } = defineProps<TooltipProps>();

import { ref } from 'vue';
import { TooltipProps } from './type';

const isvisible = ref(false);


const showTooltip = () => {
    isvisible.value = true
}

const hideTooltip = () => {
    isvisible.value = false
}

</script>