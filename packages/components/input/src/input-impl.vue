<template>
    <div>
        <input
            ref="input"
            v-model="value"
            :disabled="!editable || !disabled"
            :class="{
                '!b-blue-5': floatingVisible
            }"
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
    </div>
</template>

<script setup lang="ts">
import { computed, inject, watch } from 'vue';

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

// 从 Floating 注入的 Ref, 仅用于下拉框打开/关闭状态
const floatingVisible = inject('floatingVisible')

const modelValue = defineModel()
const value = computed(() => propValue ?? modelValue.value)

watch(() => propValue, console.log)

// const input = useTemplateRef('input')
</script>