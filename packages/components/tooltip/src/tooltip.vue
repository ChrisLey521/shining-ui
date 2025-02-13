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
        <slot>
            {{ content }}
        </slot>
    </Floating>
</template>

<script setup lang=ts>
import { Placement, Trigger } from 'constants/common';
import { PopperTheme, tooltipBgMap, TooltipProps } from 'constants/floating';
import { computed } from 'vue';
import { Floating } from '../../floating';

const {
    theme = PopperTheme.Light,
    placement = Placement.TopStart,
    offset,
    visible,
    trigger = Trigger.Hover,
    container = 'body',
    showArrow = true,
    disabled
} = defineProps<TooltipProps>()

const themeStyles = computed(() => tooltipBgMap.get(theme))

const modelVisible = defineModel<boolean>('visible')
</script>