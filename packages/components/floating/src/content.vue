<template>
    <div
        :class="[...themeStyles, ZIndex.Tooltip, floatingClass]"
        :style="{
            width,
            ...floatingPositionStyles,
            ...objectifyStyle(customFloatingStyle)
        }"
        rounded-md
        b
        b-solid
        py-1
        px-2
    >
        <slot>
            <div v-if="contentAsHtml" v-html="content" />
            <template v-else>{{ content }}</template>
        </slot>
        <slot name="arrow" />
    </div>
</template>

<script setup lang="ts">
import { objectifyStyle } from '@shining-ui/utils';
import { ZIndex } from 'constants/common';
import { computed, getCurrentInstance } from 'vue';
import { FloatingContentProps } from './type';


const {
    themeStyles = [],
    floatingStyles: customFloatingStyle,
    floatingPositionStyles = {}
} = defineProps<FloatingContentProps>()

const { proxy } = getCurrentInstance()

const element = computed(() => proxy.$el)

defineExpose({
    element
})
</script>