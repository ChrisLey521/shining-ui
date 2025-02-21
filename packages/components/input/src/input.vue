<template>
    <div
        :class="[height, { 'relative z-1 bg-gray-1 cursor-not-allowed': disabled }]"
        flex
        items-center
        w-full
        px-2
        py-1
        b
        b-solid
        b-gray-3
        rounded
        focus-within:b-blue-5
        @click="handleClick"
    >
        <slot v-if="$slots.prefix" name="prefix">
            <Icon v-if="prefixIcon" :name="prefixIcon"  />
        </slot>
        <input
            ref="input"
            v-mdoel="value"
            :type
            :placeholder
            :form
            :name
            :max-length
            :min-length
            :tabindex
            :disabled
            :readonly
            :autocomplete
            :multiple="true"
            :autofocus
            flex-1
            b-0
            outline-none
        />
        <Button
            v-if="clearable"
            size="mini"
            ghost
            circle
            icon="circle-close"
            @click="handleClear"
        />
        <Button
            v-if="propType === 'password'"
            size="mini"
            ghost
            circle
            icon="search"
            @click="showPassword = !showPassword"
        />
        <span v-if="type === 'text' && showLengthLimit">{{ (modelValue as string).length }} / {{ maxLength }}</span>
        <slot v-if="$slots.suffix" name="suffix">
            <Icon v-if="suffixIcon" :name="suffixIcon"  />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { size2height } from 'constants/common';
import { computed, ref, useTemplateRef } from 'vue';
import { Button } from '../../button';
import { Icon } from '../../icon';
import { InputProps } from './type';

const {
    type: propType,
    size,
    formatter,
    parser,
    minLength = 0,
    maxLength
} = defineProps<InputProps>()

const height = size2height.get(size)

const showPassword = ref(false)
const type = computed<typeof propType>(() => propType === 'password' && showPassword.value
    ? 'text'
    : propType
)

const modelValue = defineModel<string>()

const formatLength = (val: string) => val.slice(0, maxLength)

const format = (val: string) => typeof formatter === 'function'
    ? formatLength(formatter(val))
    : formatLength(val)

const parse = (val: string): string => typeof parser === 'function'
    ? formatLength(parser(val))
    : formatLength(val)

const value = computed<string>({
    get: () => format(modelValue.value),
    set: (newValue) => {
        modelValue.value = parse(newValue)
    }
})

const handleClear = () => modelValue.value = ''

const input = useTemplateRef('input')
const handleClick = () => input.value?.focus()

</script>