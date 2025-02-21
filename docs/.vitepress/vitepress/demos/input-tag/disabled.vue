<template>
    <div>
        <sn-input-tag v-model="value" disabled />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['禁用'])
</script>