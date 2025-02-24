<template>
    <sn-textarea
        v-model="value"
        :maxlength="200"
        show-word-count
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>