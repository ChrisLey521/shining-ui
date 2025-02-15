<template>
    <Floating
        ref="floating"
        :visible="false"
        :disabled
        :container
        :placement
        :offset
        :trigger
        enterable
        :width
        :show-arrow="false"
        :delay
        :transition
        :themeStyles
    >
        <template #reference>
            <slot />
        </template>
        <slot name="dropdown" />
    </Floating>
</template>

<script setup lang=ts>
import { Placement, Trigger } from 'constants/common';
import { overlayBgMap, PopperTheme } from 'constants/floating';
import { computed, provide, ref, useTemplateRef } from 'vue';
import { Floating } from '../../floating';
import { DropdownProps } from './type';

const {
    theme = PopperTheme.Light,
    placement = Placement.Bottom,
    offset,
    trigger = Trigger.Hover,
    container = 'body',
    disabled
} = defineProps<DropdownProps>()

const themeStyles = computed(() => overlayBgMap.get(theme))

const floating = useTemplateRef('floating')
const open = () => floating.value?.open()
const close = () => floating.value?.close()

defineExpose({
    open,
    close
})

const active = ref()
const emits = defineEmits(['command'])
const handleSelect = (cmd: string) => {
    active.value = cmd
    emits('command', cmd)
}
provide('select', handleSelect)
provide('active', active)

</script>