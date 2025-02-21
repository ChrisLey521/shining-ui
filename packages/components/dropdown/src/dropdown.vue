<template>
    <Floating
        ref="floating"
        :virtual="splitButton"
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
        :x-padding="false"
        @visible-change="(value, oldValue) => $emit('visible-change', value, oldValue)"
    >
        <template #reference>
            <ButtonGroup v-if="splitButton" :variant>
                <Button>
                    <slot />
                </Button>
                <Button
                    ref="reference"
                    icon="arrow-down"
                    @[showFloatingEvent]="open"
                    @[hideFloatingEvent]="close"
                    @click="trigger === Trigger.Click && toggle()"
                />
            </ButtonGroup>
            <slot v-else />
        </template>
        <slot name="dropdown" />
    </Floating>
</template>

<script setup lang=ts>
import { useFloatingActions } from 'composables/floating';
import { Placement, Trigger } from 'constants/common';
import { overlayBgMap, PopperTheme } from 'constants/floating';
import { computed, onMounted, provide, ref, useTemplateRef } from 'vue';
import { Button } from '../../button';
import { ButtonGroup } from '../../button-group';
import { Floating } from '../../floating';
import { activeDropdownItemKey, hideDropdownOnClickKey, onSelectKey } from './const';
import { DropdownProps } from './type';

const {
    theme = PopperTheme.Light,
    placement = Placement.Bottom,
    offset,
    trigger = Trigger.Hover,
    container = 'body',
    disabled,
    hideOnClick = true,
    splitButton,
    variant
} = defineProps<DropdownProps>()

const themeStyles = computed(() => overlayBgMap.get(theme))

const floating = useTemplateRef('floating')
const reference = useTemplateRef('reference')

// provide('virtualRef', reference)
onMounted(() => {
    if (!splitButton) return
    const el = reference.value?.$el
    floating.value.setReference(el)
})

const {
    showFloatingEvent,
    hideFloatingEvent
} = useFloatingActions(trigger)

const open = () => floating.value?.open()
const close = () => floating.value?.close()
const toggle = () => floating.value?.toggle()

defineExpose({
    open,
    close,
    toggle
})

const active = ref()

const emits = defineEmits<{
    (e: 'visible-change', value: boolean, oldValue: boolean): void
    (e: 'command', value: string): void
}>()

const handleSelect = (cmd: string) => {
    active.value = cmd
    emits('command', cmd)
}

provide(onSelectKey, handleSelect)
provide(activeDropdownItemKey, active)
provide(hideDropdownOnClickKey, hideOnClick)

</script>