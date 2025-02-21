<template>
    <sn-input
        v-model="value"
        clearable
        :formatter="(val: string) => `￥${val}`"
        :parser="(val: string) => val.replace(/^￥/, '')"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>