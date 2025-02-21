<template>
    <div flex flex-col gap-2>
        <sn-input-tag v-model="value">
            <template #tag="{ value }">
                <span>{{ value }}</span>
            </template>
        </sn-input-tag>
        <sn-input-tag v-model="value1">
            <template #prepend>
                <sn-icon name="search" />
            </template>
        </sn-input-tag>
        <sn-input-tag v-model="value2">
            <template #append>
                <sn-icon name="loading" />
            </template>
        </sn-input-tag>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['tag 插槽'])
const value1 = ref(['prepend 插槽'])
const value2 = ref(['append 插槽'])
</script>