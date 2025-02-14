<template>
    <Floating
        :visible
        :disabled
        :container
        :content
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
            <slot name="reference" />
        </template>
        <slot>
            {{ content }}
        </slot>
    </Floating>
</template>

<script setup lang=ts>
import { Placement, Trigger } from 'constants/common';
import { overlayBgMap, PopperTheme } from 'constants/floating';
import { computed, ref } from 'vue';
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

const visible = ref(false)
</script>