<template>
    <sn-input-number v-model="value">
        <template #prepend>￥</template>
        <template #append>圆</template>
    </sn-input-number>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref<number>()
</script>