<template>
    <div
        flex
        flex-row
        justify-start
        items-center
        gap-2
    >
        <sn-input-number v-model="value" controls-position="side" />
        <sn-input-number v-model="value" controls-position="right" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref<number>()
</script>