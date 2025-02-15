<template>
    <FloatingTrigger
        ref="trigger"
        v-if="!virtual"
        :trigger
        :disabled
        :has-model-visible
        :controlled
    >
        <slot name="reference" />
    </FloatingTrigger>
    <Teleport :to="container">
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
import { computed, onMounted, provide, ref, useTemplateRef } from 'vue';
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
    referenceElement
} = defineProps<FloatingProps>()

const reference = ref(virtual ? referenceElement : null)

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

const open = () => {
    visible.value = true
    if (hasModelVisible.value) modelVisible.value = true
}

const close = () => {
    visible.value = false
    if (hasModelVisible.value) modelVisible.value = false
}

const toggle = () => visible.value
    ? close()
    : open()

const triggerRef = useTemplateRef('trigger')
const triggerElement = computed(() => triggerRef.value?.element)

onMounted(() => {
    reference.value = virtual
        ? referenceElement
        : triggerElement.value
})

defineExpose({
    open,
    close,
    toggle
})

provide('open', open)
provide('close', close)
provide('toggle', toggle)

</script>