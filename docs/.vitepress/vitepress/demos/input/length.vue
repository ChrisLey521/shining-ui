<template>
    <sn-input
        v-model="value"
        :maxlength="16"
        :minlength="6"
        show-word-count
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>