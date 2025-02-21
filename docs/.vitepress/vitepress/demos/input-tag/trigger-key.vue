<template>
    <div>
        <sn-input-tag v-model="value" trigger-key="space" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['标签1', '标签2', '标签3'])
</script>