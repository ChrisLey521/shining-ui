<template>
    <sn-input-number v-model="value" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref<number>()
</script>