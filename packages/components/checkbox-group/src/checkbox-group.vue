<script setup lang="ts">
import { CheckboxGroupProps } from './type'
import { CHECKBOX_GROUP_CONTEXT_KEY, CHECKBOX_LABEL_ALIGN } from './const'
import { provide, reactive } from 'vue'

const { labelAlign } = defineProps<CheckboxGroupProps>()

provide(CHECKBOX_GROUP_CONTEXT_KEY, reactive({
    [CHECKBOX_LABEL_ALIGN]: labelAlign
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