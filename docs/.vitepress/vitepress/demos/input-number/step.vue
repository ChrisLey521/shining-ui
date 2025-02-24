<template>
    <sn-input-number v-model="value" controls />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref<number>()
</script>