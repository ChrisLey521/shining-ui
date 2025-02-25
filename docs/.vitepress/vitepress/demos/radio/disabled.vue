<template>
    Pick 你最不喜欢的水果:
    <sn-radio-group v-model="fruits">
        <sn-radio
            v-for="{ value, label, disabled} in radioOptions"
            :key="value"
            :value
            :label
            :disabled
        />
    </sn-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fruits = ref<number[]>([])

const radioOptions: { value: number, label: string }[] = [
    {
        value: 1,
        label: '苹果',
        disabled: true
    },
    {
        value: 2,
        label: '迷hotel'
    },
    {
        value: 3,
        label: '火龙果'
    }
] as const
</script>