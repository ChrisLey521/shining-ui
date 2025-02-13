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
import { SingleChild } from '../../single-child';
import { FloatingTriggerProps } from './type';

const {
    trigger,
    disabled,
    hasModelVisible,
    controlled
} = defineProps<FloatingTriggerProps>()


const emits = defineEmits(['open', 'close', 'toggle'])

const {
    showFloatingEvent,
    hideFloatingEvent,
    showFloating,
    hideFloating,
    handleReferenceClick,
} = useFloatingEvents({
    trigger,
    disabled,
    hasModelVisible,
    controlled,
    emits
})
</script>