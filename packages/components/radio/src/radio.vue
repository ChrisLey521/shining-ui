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
            type="radio"
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
import { RadioProps } from './type';

defineProps<RadioProps>()
</script>