<template>
    <div>
        默认尺寸
        <sn-input-number v-model="value" />
    </div>
    <div>
        大尺寸
        <sn-input-number v-model="value" size="large" />
    </div>
    <div>
        中尺寸
        <sn-input-number v-model="value" size="medium" />
    </div>
    <div>
        小尺寸
        <sn-input-number v-model="value" size="small" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref<number>()
</script>