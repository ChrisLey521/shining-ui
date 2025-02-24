<template>
    <sn-textarea v-model="value" autosize />
    <sn-textarea v-model="value" :autosize="false" mt-5 />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>