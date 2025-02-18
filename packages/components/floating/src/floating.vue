<template>
    <FloatingTrigger
        ref="reference"
        v-if="!virtual"
        :trigger
        :disabled
        :has-model-visible
        :controlled
    >
        <slot name="reference" />
    </FloatingTrigger>
    <slot v-else name="reference" />
    <Teleport :to="container">
        <Transition
            mode="default"
            :name="transition"
            :duration="delay">
            <FloatingContent
                ref="floating"
                v-if="!disabled && computedVisible"
                :class="{
                    'px-2': xPadding
                }"
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
import { useFloatingVue } from 'composables/floating';
import { Placement, Trigger } from 'constants/common';
import { computed, provide, ref, useTemplateRef } from 'vue';
import FloatingContent from './content.vue';
import FloatingTrigger from './trigger.vue';
import { FloatingProps } from './type';

const {
    visible: controlledVisible,
    virtual = false,
    container = 'body',
    placement = Placement.TopStart,
    offset = 10,
    delay = 200,
    trigger = Trigger.Hover,
    enterable = true,
    showArrow = true,
    xPadding = true,
} = defineProps<FloatingProps>()

const reference = ref(null)

const setReference = (target: HTMLElement) => reference.value = target

const modelVisible = defineModel<boolean>('visible')

const hasModelVisible = computed(() => typeof modelVisible.value !== 'undefined')
const controlled = computed(() => typeof controlledVisible !== 'undefined')

const visible = ref(false)

const computedVisible = computed(() => modelVisible.value ?? controlledVisible ?? visible.value)

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

const open = () => {
    if (controlled.value) return
    visible.value = true
    if (hasModelVisible.value) modelVisible.value = true
}

const close = () => {
    if (controlled.value) return
    visible.value = false
    if (hasModelVisible.value) modelVisible.value = false
}

const toggle = () => visible.value
    ? close()
    : open()

defineExpose({
    open,
    close,
    toggle,
    setReference
})

provide('open', open)
provide('close', close)
provide('toggle', toggle)

</script>