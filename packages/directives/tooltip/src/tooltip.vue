<template>
    <Transition
        mode="out-in"
        :name="transition"
        :duration="delay">
        <Floating
            ref="floating"
            :visible
            :disabled
            :container
            :content
            :content-as-html
            :placement
            :offset
            :trigger
            :enterable
            :width
            :show-arrow
            :themeStyles
            :floating-class
            :floating-styles
            :reference-element
        >
            <component v-if="contentAsComponent" :is="content"></component>
        </Floating>
    </Transition>
</template>

<script setup lang=ts>
import { attachEvent, removeEvent } from '@shining-ui/utils/dom';
import { useFloatingActions } from 'composables/floating';
import { Placement, Trigger } from 'constants/common';
import { PopperTheme, tooltipBgMap, TooltipProps } from 'constants/floating';
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue';
import { Floating } from '../../../components/floating';

const {
    visible,
    theme = PopperTheme.Dark,
    trigger = Trigger.Hover,
    placement = Placement.TopStart,
    offset = 10,
    showArrow = true,
    enterable = true,
    referenceElement
} = defineProps<TooltipProps & {
    referenceElement: HTMLElement
}>()

const themeStyles = computed(() => tooltipBgMap.get(theme))

const floating = useTemplateRef('floating')

const {
    showFloatingEvent,
    hideFloatingEvent
} = useFloatingActions(trigger)

const actions = computed(() => new Map([
    [showFloatingEvent.value, floating.value.open],
    [hideFloatingEvent.value, floating.value.close],
    ['click', floating.value.toggle]
]))

const handleClickOutside = ({ target }: MouseEvent) => {
    if (referenceElement.contains(target as HTMLElement)) return
    if (floating.value?.contentElement?.contains?.(target as HTMLElement)) return
    floating.value.close()
}

const attachEvents = () => {
    if (!referenceElement) return
    [...actions.value.entries()].forEach(([eventName, handler]) => attachEvent(referenceElement, eventName, handler))

    attachEvent(window, 'click', handleClickOutside)
}

const removeEvents = () => {
    if (!referenceElement) return
    [...actions.value.entries()].forEach(([eventName, handler]) => removeEvent(referenceElement, eventName, handler))

    removeEvent(window, 'click', handleClickOutside)
}

onMounted(() => {
    attachEvents()
})

onUnmounted(() => {
    removeEvents()
})
</script>