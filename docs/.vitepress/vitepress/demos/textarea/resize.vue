<template>
    <sn-textarea v-model="value" resize />
    <sn-textarea v-model="value" :resize="false" mt-5 />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>