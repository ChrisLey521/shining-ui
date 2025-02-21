<template>
    <div>
        <sn-input-tag v-model="value" :max="3" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['标签1', '标签2', '标签3'])
</script>