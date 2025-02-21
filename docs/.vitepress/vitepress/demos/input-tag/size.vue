<template>
    <div>
        <div>默认</div>
        <sn-input-tag v-model="value" />
        <div v-mdo>大尺寸</div>
        <sn-input-tag v-model="value1" size="large" />
        <div>中尺寸</div>
        <sn-input-tag v-model="value2" size="medium" />
        <div>小尺寸</div>
        <sn-input-tag v-model="value3" size="small" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['默认尺寸'])
const value1 = ref(['大尺寸'])
const value2 = ref(['中尺寸'])
const value3 = ref(['小尺寸'])
</script>