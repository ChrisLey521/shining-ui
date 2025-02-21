<template>
    <div
        :class="[
            height,
            'group',
            { 'relative z-1 bg-gray-1 cursor-not-allowed': disabled }
        ]"
        flex
        gap-1
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
            :autocomplete
            :autofocus
            flex-1
            placeholder-gray-3
            caret-blue-5
            b-0
            outline-none
        />
        <Button
            v-if="clearable"
            class="!hidden !group-hover:inline"
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
    </div>
</template>

<script setup lang="ts">
import { DEFAULT_SIZE, Size, size2height } from 'constants/common';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { Button } from '../../button';
import { Icon } from '../../icon';
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

const height = size2height.get(size)
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
    get: () => {
        console.log('get -> ', format(modelValue.value))
        return format(modelValue.value)
    },
    set: (newValue) => {
        console.log('set -> ', newValue, 'parsed -> ', parse(newValue))
        modelValue.value = parse(newValue)
    }
})

const emits = defineEmits<InputEvents>()
watch(value, (newValue, oldValue) => {
    console.log('变变变', newValue)
    emits('change', newValue, oldValue)
})

const handleClear = () => modelValue.value = ''

const input = useTemplateRef('input')
const handleClick = () => input.value?.focus()

</script>