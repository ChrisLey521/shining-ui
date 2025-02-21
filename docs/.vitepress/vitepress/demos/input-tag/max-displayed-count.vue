<template>
    <div flex gap-5>
        <sn-input-tag v-model="value" :max-displayed-count="3" />
        <sn-input-tag
            v-model="value"
            :max-displayed-count="3"
            trigger-more="click"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['天地1号', '天地2号', '天地3号', '天地无号'])
</script>