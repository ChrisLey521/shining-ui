<template>
    <SingleChild
        v-if="$slots.default"
        @[showFloatingEvent]="showFloating"
        @[hideFloatingEvent]="hideFloating"
        @click="handleReferenceClick"
    >
        <slot />
    </SingleChild>
</template>

<script setup lang="ts">
import { useFloatingEvents } from 'composables/floating';
import { computed, getCurrentInstance, inject } from 'vue';
import { SingleChild } from '../../single-child';
import { FloatingTriggerProps } from './type';

const {
    trigger,
    disabled
} = defineProps<FloatingTriggerProps>()

const open = inject<() => void>('open')
const close = inject<() => void>('close')
const toggle = inject<() => void>('toggle')

const {
    showFloatingEvent,
    hideFloatingEvent,
    showFloating,
    hideFloating,
    handleReferenceClick,
} = useFloatingEvents({
    trigger,
    disabled,
    actions: {
        open,
        close,
        toggle
    }
})

const { proxy } = getCurrentInstance()
const element = computed<HTMLElement>(() => proxy.$el)

defineExpose({
    element
})
</script>