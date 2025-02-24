<template>
    <input-wrapper
        :size
        :disabled
        @click="handleClick">
        <slot name="prepend">
            <Icon
                v-if="prefixIcon"
                :name="prefixIcon"
                @click.stop="$emit('prefix-icon-click')"
            />
        </slot>
        <input
            ref="input"
            v-model="value"
            :type
            :placeholder
            :form
            :name
            :maxlength
            :minlength
            :tabindex
            :disabled
            :readonly
            :autofocus
            :autocomplete
            :aria-label
            flex-1
            placeholder-gray-3
            caret-blue-5
            b-0
            outline-none
        />
        <Button
            v-if="clearable"
            class="!hidden !group-hover/input__wrapper:inline"
            :size="buttonSize"
            ghost
            circle
            icon="circle-close"
            @click="handleClear"
        />
        <Button
            v-if="propType === 'password'"
            :size="buttonSize"
            ghost
            circle
            @click="showPassword = !showPassword"
        >
            <Icon :name="showPassword ? 'view' : 'hide'" />
        </Button>
        <span
            v-if="propType === 'text' && showWordCount"
            text-gray-4
            text-xs
        >
            {{ (modelValue as string).length }} / {{ maxlength }}
        </span>
        <slot name="append">
            <Icon
                v-if="suffixIcon"
                :name="suffixIcon"
                @click.stop="$emit('suffix-icon-click')"
            />
        </slot>
    </input-wrapper>
</template>

<script setup lang="ts">
import { DEFAULT_SIZE, Size } from 'constants/common';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { Button } from '../../button';
import { Icon } from '../../icon';
import InputWrapper from './input-wrapper.vue';
import { InputEvents, InputProps } from './type';

const {
    type: propType = 'text',
    size = DEFAULT_SIZE,
    placeholder = '请输入...',
    formatter,
    parser,
    minlength = 0,
    maxlength
} = defineProps<InputProps>()

const buttonSize = computed(() => {
    const size2ButtonSize = new Map<`${Size}`, `${Size}`>([
        [Size.Large, Size.Medium],
        [Size.Medium, Size.Small],
        [Size.Small, Size.Mini]
    ])
    return size2ButtonSize.get(size)
})

const showPassword = ref(false)
const type = computed<typeof propType>(() => propType === 'password' && showPassword.value
    ? 'text'
    : propType
)

const modelValue = defineModel<string>()

const formatLength = (val: string) => val.slice(0, maxlength)

const format = (val: string) => typeof formatter === 'function'
    ? formatLength(formatter(val))
    : formatLength(val)

const parse = (val: string): string => typeof parser === 'function'
    ? formatLength(parser(val))
    : formatLength(val)

const value = computed<string>({
    get: () => format(modelValue.value),
    set: (newValue) => modelValue.value = parse(newValue)
})

const emits = defineEmits<InputEvents>()
watch(value, (newValue, oldValue) => emits('change', newValue, oldValue))

const handleClear = () => modelValue.value = ''

const input = useTemplateRef('input')
const handleClick = () => input.value?.focus()

</script>