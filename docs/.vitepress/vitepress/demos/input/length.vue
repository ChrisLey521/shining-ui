<template>
    <sn-input
        v-model="value"
        :max-length="16"
        :min-length="6"
        show-length-limit
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>