<template>
    <div
        ref="floating"
        v-click-outside="onClickOutside"
        :class="[...themeStyles, ZIndex.Tooltip, floatingClass, FLOATING_CONTENT_CLASSNAME]"
        :style="{
            width,
            ...floatingPositionStyles,
            ...objectifyStyle(customFloatingStyle)
        }"
        rounded-md
        b
        b-solid
        py-1
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
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
import { objectifyStyle, stopWhenFalsePositive } from '@shining-ui/utils';
import { Trigger, ZIndex } from 'constants/common';
import { inject, useTemplateRef } from 'vue';
import { FloatingContentProps } from './type';

const FLOATING_CONTENT_CLASSNAME = '__floating_content'

const {
    trigger = Trigger.Hover,
    enterable = true,
    themeStyles = [],
    floatingStyles: customFloatingStyle,
    floatingPositionStyles = {}
} = defineProps<FloatingContentProps>()

const open = inject<() => void>('open')
const close = inject<() => void>('close')

const floating = useTemplateRef('floating')

const onClickOutside = ({ target }: MouseEvent) => {
    if (trigger === Trigger.Hover) return
    if (floating.value?.contains?.(target as HTMLElement)) return
    close()
}

const handleMouseEnter = async ({ x, y }: MouseEvent) => {
    const enteredElement = document.elementFromPoint(x, y)
    if (!enteredElement.classList.contains(FLOATING_CONTENT_CLASSNAME)) return
    if (!enterable) return
    open()
}

const handleMouseLeave = (e: MouseEvent) => {
    stopWhenFalsePositive(e, () => {
        if (trigger !== Trigger.Hover) return
        close()
    })
}
</script>