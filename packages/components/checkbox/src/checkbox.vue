<template>
    <label
        :class="labelAlign === 'left' ? 'flex-row' : 'flex-row-reverse'"
        flex
        gap-2
        justify-start
        items-center
    >
        {{ label }}
        <input
            type="checkbox"
            :value
            :disabled
            :readonly
            :form
            :name
            :tabindex
            :autofocus
            :aria-label
        />
    </label>
</template>

<script setup lang="ts">
import { CheckboxProps } from './type';

defineProps<CheckboxProps>()
</script>