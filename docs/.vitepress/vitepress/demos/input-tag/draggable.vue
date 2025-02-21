<template>
    <div>
        <sn-input-tag v-model="value" draggable />
    </div>
    <div>
        <sn-input-tag
            v-model="value1"
            draggable
            :max-displayed-count="3"
            trigger-more="click"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['可拖拽排序'])
const value1 = ref(['标签1', '标签2', '标签3', '标签4', '标签5', '标签6'])
</script>