<template>
    <Floating
        v-model:visible="modelVisible"
        :visible
        :disabled
        :container
        :content
        :content-as-html
        :placement
        :offset
        :trigger
        enterable
        :width
        :show-arrow
        :delay
        :transition
        :themeStyles
        :floating-class
        :floating-styles
    >
        <template #reference>
            <slot name="reference" />
        </template>
        <h3 v-if="title" mb-2 text-gray-9 text-base font-550>{{ title }}</h3>
        <slot>
            {{ content }}
        </slot>
    </Floating>
</template>

<script setup lang=ts>
import { Placement, Trigger } from 'constants/common';
import { overlayBgMap, PopperTheme } from 'constants/floating';
import { computed } from 'vue';
import { Floating } from '../../floating';
import { OverlayProps } from './type';

const {
    theme = PopperTheme.Light,
    placement = Placement.TopStart,
    offset,
    visible,
    trigger = Trigger.Hover,
    container = 'body',
    showArrow = true,
    disabled
} = defineProps<OverlayProps>()

const themeStyles = computed(() => overlayBgMap.get(theme))

const modelVisible = defineModel<boolean>('visible')
</script>