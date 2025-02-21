<template>
    <div>
        <sn-input-tag v-model="value" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['基础用法'])
</script>