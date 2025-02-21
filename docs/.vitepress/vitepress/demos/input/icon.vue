<template>
    <sn-input
        v-model="value"
        prefixIcon="tag"
        @prefix-icon-click="handlePrefixIconClick"
    />
    <sn-input
        v-model="value"
        suffixIcon="sunny"
        @suffix-icon-click="handleSuffixIconClick"
    />
    <sn-input v-model="value">
        <template #prepend>
            <sn-icon name="search" @click.stop="handlePrependIconClick" />
        </template>
    </sn-input>
    <sn-input v-model="value" clearable>
        <template #append>
            <sn-icon name="camera" @click.stop="handleAppendIconClick" />
        </template>
    </sn-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')

const handlePrefixIconClick = () => alert('prefix-icon-click')
const handleSuffixIconClick = () => alert('suffix-icon-click')

const handlePrependIconClick = () => alert('prepend')
const handleAppendIconClick = () => alert('append')
</script>