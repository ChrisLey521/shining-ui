<template>
    <Transition
        name="fade"
        mode="out-in"
        :duration="100">
        <div
            v-if="!disabled && visible"
            ref="floating"
            :class="[...themeStyles, ZIndex.Tooltip, popperClass]"
            :style="{
                ...floatingStyles,
                width,
                ...objectifyStyle(popperStyle)
            }"
            rounded-md
            b
            b-solid
            py-1
            px-2
        >
            <component v-if="contentAsComponent" :is="content" />
            <div v-else-if="contentAsHTML" v-html="content" />
            <template v-else>{{ content }}</template>
            <div
                ref="floatingArrow"
                id="__popper-arrow"
                :class="[...themeStyles, ...arrowBorderClasses]"
                :style="arrowPositionStyles"
                absolute
                b
                b-solid
                w-8px
                h-8px
                transform-rotate-45
            />
        </div>
    </Transition>
</template>

<script setup lang=ts>
import { attachEvent, removeEvent } from '@shining-ui/utils';
import { objectifyStyle } from '@shining-ui/utils/dom';
import { useFloatingEvents, useFloatingVue } from 'composables/floating';
import { ZIndex } from 'constants/common';
import { PopperTheme, tooltipBgMap, TooltipProps } from 'constants/popper';
import { computed, onMounted, onUnmounted } from 'vue';

const {
    theme = PopperTheme.Dark,
    trigger,
    disabled,
    visible: controlledVisible,
    placement,
    offset = 10,
    referenceElement
} = defineProps<TooltipProps & {
    referenceElement: HTMLElement
}>()

const themeStyles = computed(() => tooltipBgMap.get(theme))

const modelVisible = defineModel<boolean>('visible')

const {
    reference,
    floating,
    floatingArrow,
    arrowPositionStyles,
    arrowBorderClasses,
    floatingStyles,
} = useFloatingVue({
    placement,
    offset,
    trigger,
    modelVisible,
    controlledVisible,
    disabled
})

const {
    visible,
    showFloatingEvent,
    hideFloatingEvent,
    showFloating,
    hideFloating,
    handleReferenceClick,
    handleClickOutside,
} = useFloatingEvents({
    reference,
    floating,
    trigger,
    disabled,
    modelVisible,
    controlledVisible
})

onMounted(() => {
    reference.value = referenceElement

    if (!referenceElement) return
    attachEvent(referenceElement, showFloatingEvent.value, showFloating)
    attachEvent(referenceElement, hideFloatingEvent.value, hideFloating)
    attachEvent(referenceElement, 'click', handleReferenceClick)

    attachEvent(window, 'click', handleClickOutside)
})

const destroy = () => {
    if (!referenceElement) return
    removeEvent(referenceElement, showFloatingEvent.value, showFloating)
    removeEvent(referenceElement, hideFloatingEvent.value, hideFloating)
    removeEvent(referenceElement, 'click', handleReferenceClick)
    
    removeEvent(window, 'click', handleClickOutside)
}

onUnmounted(destroy)

defineExpose({
    destroy
})

</script>