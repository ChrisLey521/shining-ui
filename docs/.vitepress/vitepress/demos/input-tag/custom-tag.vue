<template>
    <div>
        <sn-input-tag v-model="value">
            <template #tag="{ value }">
                <sn-tag variant="danger" size="small">{{ value }}</sn-tag>
            </template>
        </sn-input-tag>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['自定义标签'])
</script>