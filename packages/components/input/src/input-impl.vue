<template>
    <div>
    </div>
    <input
        ref="input"
        v-model="value"
        :disabled="!editable || disabled"
        relative
        z--1
        w-full
        px-2
        py-1
        b
        b-solid
        b-gray-3
        focus:b-blue-5
        rounded
    />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

const {
    value: propValue,
    editable = true,
    disabled = false,
    width: propWidth
} = defineProps<{
    value?: string | number | (string | number)[]
    editable?: boolean
    disabled?: boolean
    width?: string | number
}>()

const width = computed(() => typeof propWidth === 'number'
    ? `${propWidth}px`
    : width
)

const modelValue = defineModel()
const value = computed({
    get: () => propValue ?? modelValue.value,
    set: (newValue) => modelValue.value = newValue
})

watch(() => value, (val) => {
    console.log('propVal -> ', val)
})

// const input = useTemplateRef('input')
</script>