<template>
    Pick 你最不喜欢的水果:
    <sn-checkbox-group v-model="fruits">
        <sn-checkbox
            v-for="{ value, label} in radioOptions"
            :key="value"
            :value="value"
            :label="label"
        />
    </sn-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fruits = ref<number[]>([])

const radioOptions: { value: number, label: string }[] = [
    {
        value: 1,
        label: '苹果'
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