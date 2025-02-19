<template>
    <DropdownMenu :width>
        <slot />
    </DropdownMenu>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { DropdownMenu } from '../../dropdown';
import { selectContextKey } from './const';
import { SelectContext } from './type';

const selectContext = inject<SelectContext>(selectContextKey)
const width = computed(() => selectContext.select?.$el?.offsetWidth)

</script>