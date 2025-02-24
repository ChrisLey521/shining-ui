<template>
    <sn-input-number v-model="value" :precision="2" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref<number>()
</script>