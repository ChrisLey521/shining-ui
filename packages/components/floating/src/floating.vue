<template>
    <FloatingTrigger
        ref="reference"
        v-if="!virtual"
        :trigger
        :disabled
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
                v-if="!disabled && visible"
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
import { computed, provide, ref, useTemplateRef, watch } from 'vue';
import FloatingContent from './content.vue';
import FloatingTrigger from './trigger.vue';
import { FloatingProps } from './type';

const {
    visible: propVisible,
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

const modelVisible = defineModel<boolean>('visible', { default: void 0 })

const visible = computed(() => propVisible ?? modelVisible.value)

// provide('floatingVisible', visible)

const emits = defineEmits<{
    (e: 'visible-change', value: boolean, oldValue: boolean): void
}>()

watch(visible, (value, oldValue) => emits('visible-change', value, oldValue))

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

const open = () => modelVisible.value = true
const close = () => modelVisible.value = false
const toggle = () => modelVisible.value = !modelVisible.value

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