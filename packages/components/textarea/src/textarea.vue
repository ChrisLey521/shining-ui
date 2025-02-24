<template>
    <input-wrapper
        class="!p-0"
        :disabled
        size="medium"
        relative
    >
        <textarea
            v-model="modelValue"
            :class="{
                'resize-none': !resize
            }"
            :rows
            :autocomplete
            :autofocus
            :autosize
            :aria-label
            :maxlength
            :minlength
            :placeholder
            :disabled
            :readonly
            :form
            :id
            :name
            :tabindex
            w-full
            px-2
            py-1
            placeholder-gray-3
            caret-blue-5
            b-0
            rounded
            outline-none
        />
        <span
            v-if="showWordCount"
            text-gray-4
            text-xs
            absolute
            right-5
            bottom-1
        >
            {{ (modelValue as string)?.length ?? 0 }} / {{ maxlength }}
        </span>
    </input-wrapper>
</template>

<script setup lang="ts">
import { InputWrapper } from '../../input';
import { TextareaProps } from './type';

const { resize } = defineProps<TextareaProps>()

const modelValue = defineModel<string>()
</script>