<template>
    <div flex flex-col gap-2>
        <sn-input-tag v-model="value1" />
        <sn-input-tag v-model="value2" variant="primary" />
        <sn-input-tag v-model="value3" variant="success" />
        <sn-input-tag v-model="value4" variant="warning" />
        <sn-input-tag v-model="value5" variant="danger" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(['default'])
const value2 = ref(['primary'])
const value3 = ref(['success'])
const value4 = ref(['warning'])
const value5 = ref(['danger'])
</script>