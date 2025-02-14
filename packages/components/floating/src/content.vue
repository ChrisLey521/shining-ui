<template>
    <div
        ref="floating"
        v-click-outside="onClickOutside"
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
import { vClickOutside } from '@shining-ui/directives';
import { objectifyStyle } from '@shining-ui/utils';
import { Trigger, ZIndex } from 'constants/common';
import { useTemplateRef } from 'vue';
import { FloatingContentProps } from './type';

const {
    trigger = Trigger.Hover,
    themeStyles = [],
    floatingStyles: customFloatingStyle,
    floatingPositionStyles = {}
} = defineProps<FloatingContentProps>()

const floating = useTemplateRef('floating')

const emits = defineEmits(['close'])
const onClickOutside = ({ target }: MouseEvent) => {
    if (trigger === Trigger.Hover) return
    if (floating.value?.contains?.(target as HTMLElement)) return
    emits('close')
}
</script>