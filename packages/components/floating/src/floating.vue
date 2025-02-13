<template v-click-outside="handleClickOutside">
    <FloatingTrigger
        :ref="referenceElement ? void 0 : 'reference'"
        v-if="!virtual"
        v-click-outside="handleClickOutside"
        :trigger
        :disabled
        :has-model-visible
        :controlled
        @open="openFloating"
        @close="closeFloating"
        @toggle="toggleFloating"
    >
        <slot name="reference" />
    </FloatingTrigger>
    <Teleport defer :to="container">
        <Transition
            mode="out-in"
            :name="transition"
            :duration="delay">
            <FloatingContent
                ref="floating"
                v-if="visible && !disabled"
                :show-arrow
                :trigger
                :enterable
                :theme-styles
                :reference
                :content-as-html
                :content
                :width
                :floating-class
                :floating-position-styles
                :floating-styles
                @mouseenter="enterable && trigger === Trigger.Hover && openFloating()"
                @mouseleave="trigger === Trigger.Hover && closeFloating()"
            >
                <slot />
                <template v-if="showArrow" #arrow>
                    <div
                        ref="floatingArrow"
                        :class="[...themeStyles, ...arrowBorderClasses]"
                        :style="arrowPositionStyles"
                        absolute
                        b
                        b-solid
                        w-8px
                        h-8px
                        transform-rotate-45
                    />
                </template>
            </FloatingContent>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { vClickOutside } from '@shining-ui/directives/click-outside';
import { useFloatingVue } from 'composables/floating';
import { Placement, Trigger } from 'constants/common';
import { computed, ref, useTemplateRef } from 'vue';
import FloatingContent from './content.vue';
import FloatingTrigger from './trigger.vue';
import { FloatingProps } from './type';

const {
    visible: controlledVisible,
    container = 'body',
    placement = Placement.TopStart,
    offset = 10,
    delay = 200,
    trigger = Trigger.Hover,
    enterable = true,
    showArrow = true,
    referenceElement
} = defineProps<FloatingProps>()

const reference = ref(referenceElement ?? null)

const modelVisible = defineModel<boolean>('visible')

const hasModelVisible = computed(() => typeof modelVisible.value !== 'undefined')
const controlled = computed(() => typeof controlledVisible !== 'undefined')

const visible = ref(modelVisible.value ?? controlledVisible ?? false)

const floating = useTemplateRef<HTMLElement & { element?: HTMLElement }>('floating')
const {
    floatingArrow,
    arrowPositionStyles,
    arrowBorderClasses,
    floatingStyles: floatingPositionStyles,
} = useFloatingVue({
    placement,
    offset,
    showArrow,
    reference,
    floating
})

const openFloating = () => {
    visible.value = true
    if (hasModelVisible.value) modelVisible.value = true
}

const closeFloating = () => {
    visible.value = false
    if (hasModelVisible.value) modelVisible.value = false
}

const toggleFloating = () => visible.value
    ? closeFloating()
    : openFloating()

const handleClickOutside = ({ target }: MouseEvent) => {
    if (trigger === Trigger.Hover) return
    if (floating.value?.element?.contains?.(target as HTMLElement)) return
    closeFloating()
}

const contentElement = computed(() => floating.value?.element)

defineExpose({
    open: openFloating,
    close: closeFloating,
    toggle: toggleFloating,
    contentElement
})
</script>