<template>
    <sn-textarea v-model="value" :rows="5" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>