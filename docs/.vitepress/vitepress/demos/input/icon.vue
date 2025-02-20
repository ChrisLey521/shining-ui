<template>
    <sn-input
        v-model="value"
        prefixIcon=""
        @prefix-icon-click="handlePrefixIconClick"
    />
    <sn-input
        v-model="value"
        suffixIcon="search"
        @suffix-icon-click="handleSuffixIconClick"
    />
    <sn-input v-model="value">
        <template #prefix>
            <sn-icon name="search" />
        </template>
    </sn-input>
    <sn-input v-model="value">
        <template #suffix>
            <sn-icon name="search" />
        </template>
    </sn-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')

const handlePrefixIconClick = () => alert('prefix-icon-click')
const handleSuffixIconClick = () => alert('suffix-icon-click')
</script>