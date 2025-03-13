<script setup lang="ts">
import { RadioGroupProps } from './type'
import { RADIO_GROUP_CONTEXT_KEY, RADIO_LABEL_ALIGN } from './const'
import { provide, reactive } from 'vue'

const { labelAlign } = defineProps<RadioGroupProps>()

provide(RADIO_GROUP_CONTEXT_KEY, reactive({
    [RADIO_LABEL_ALIGN]: labelAlign
}))
</script>

<template>
    <div
        flex
        flex-row
        justify-start
        items-center
        gap-5
    >
        <slot />
    </div>
</template>