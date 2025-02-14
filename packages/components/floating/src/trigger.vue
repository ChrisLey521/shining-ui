<template>
    <SingleChild
        v-if="$slots.default"
        v-click-outside="onClickOutside"
        @[showFloatingEvent]="showFloating"
        @[hideFloatingEvent]="hideFloating"
        @click="handleReferenceClick"
    >
        <slot />
    </SingleChild>
</template>

<script setup lang="ts">
import { vClickOutside } from '@shining-ui/directives/click-outside';
import { useFloatingEvents } from 'composables/floating';
import { computed, getCurrentInstance } from 'vue';
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

const { proxy } = getCurrentInstance()
const element = computed(() => proxy.$el)

defineExpose({
    element
})
</script>