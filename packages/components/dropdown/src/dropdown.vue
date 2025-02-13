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
        <h3 v-if="title" mb-2 text-gray-9 text-base font-550>{{ title }}</h3>
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
    placement = Placement.TopStart,
    offset,
    trigger = Trigger.Hover,
    container = 'body',
    disabled
} = defineProps<DropdownProps>()

const themeStyles = computed(() => overlayBgMap.get(theme))

const visible = ref(false)
</script>