<template>
    <div>
        <sn-input-tag v-model="value" clearable />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['一键清空'])
</script>