<template>
    <sn-input v-model="value" type="password" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>