<template>
    <SingleChild
        v-if="$slots.reference"
        v-click-outside="handleClickOutside"
        ref="reference"
        @[showFloatingEvent]="showFloating"
        @[hideFloatingEvent]="hideFloating"
        @click="handleReferenceClick"
    >
        <slot name="reference" />
    </SingleChild>
    <Teleport defer :to="container">
        <Transition
            type="animation"
            name="fade"
            mode="out-in"
            :duration="300">
            <div
                ref="floating"
                v-if="!disabled && visible"
                :class="[...themeStyles, popperClass]"
                :style="{
                    ...floatingStyles,
                    width,
                    ...objectifyStyle(popperStyle)
                }"
                rounded-md
                b
                b-solid
                p-4
            >
                <h3 v-if="title" mb-2 text-gray-9 text-base font-550>{{ title }}</h3>
                <slot>
                    {{ content }}
                </slot>
                <div
                    v-if="showArrow"
                    ref="floatingArrow"
                    id="__popper-arrow"
                    :class="[...themeStyles, ...arrowBorderClasses]"
                    :style="arrowPositionStyles"
                    absolute
                    b
                    b-solid
                    w-8px
                    h-8px
                    transform-rotate-45
                />
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang=ts>
import { vClickOutside } from '@shining-ui/directives';
import { objectifyStyle } from '@shining-ui/utils/dom';
import { useFloatingEvents, useFloatingVue } from 'composables/floating';
import { Placement, Trigger } from 'constants/common';
import { PopperTheme, tooltipBgMap } from 'constants/popper';
import { computed } from 'vue';
import SingleChild from '../../single-child/src/single-child.vue';
import { OverlayProps } from './type';

const {
    theme = PopperTheme.Light,
    placement = Placement.TopStart,
    offset = 10,
    visible: controlledVisible = false,
    trigger = Trigger.Hover,
    container = 'body',
    showArrow = true,
    disabled,
} = defineProps<OverlayProps>()

const themeStyles = computed(() => tooltipBgMap.get(theme))

const modelVisible = defineModel<boolean>('visible')

const {
    reference,
    floating,
    floatingArrow,
    arrowPositionStyles,
    arrowBorderClasses,
    floatingStyles,
} = useFloatingVue({
    placement,
    offset,
    trigger,
    modelVisible,
    controlledVisible,
    disabled
})

const {
    visible,
    showFloatingEvent,
    hideFloatingEvent,
    showFloating,
    hideFloating,
    handleClickOutside,
    handleReferenceClick,
} = useFloatingEvents({
    reference,
    floating,
    trigger,
    disabled,
    modelVisible,
    controlledVisible
})

</script>