<template>
    <sn-input-number
        v-model="value"
        minus-icon="poor"
        plus-icon="sunny"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref<number>()
</script>