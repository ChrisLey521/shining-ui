<template>
    <div
        flex
        flex-row
        flex-wrap
        gap-5
        items-center
    >
        <sn-input v-model="value1" />
        <sn-input v-model="value2" size="large" />
        <sn-input v-model="value3" size="medium" />
        <sn-input v-model="value4" size="small" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('默认')
const value2 = ref('大')
const value3 = ref('中')
const value4 = ref('小')
</script>