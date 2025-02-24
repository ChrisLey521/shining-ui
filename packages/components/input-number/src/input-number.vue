<template>
    <input-wrapper
        class="!p-0 justify-between"
        :style="{
            width
        }"
        :disabled
        :size
        @click="focus"
    >
        <Button
            v-if="controls && controlsPosition === 'side'"
            class="px-2"
            :size
            ghost
            bg
            :icon="minusIcon"
            @click="stepDown"
        />
        <slot name="prepend" />
        <input
            ref="input"
            v-model="modelValue"
            type="number"
            :max
            :min
            :step
            :disabled
            :readonly
            :aria-label
            flex-1
            w-full
            px-2
            @input="handleInput"
            @focus="$emit('focus')"
            @blur="handleBlur"
        />
        <slot name="append" />
        <Button
            v-if="controls && controlsPosition === 'side'"
            class="px-2"
            :size
            ghost
            bg
            :icon="plusIcon"
            @click="stepUp"
        />
        <div
            v-if="controls && controlsPosition === 'right'"
            flex
            flex-col
            items-center
            justify-between
            w-6
            h-full
            bg-gray-1
        >
            <Icon
                name="arrow-up"
                role="button"
                flex-1
                hover:text-blue-5
                b-b
                @click="stepUp"
            />
            <Icon
                name="arrow-down"
                role="button"
                flex-1
                hover:text-blue-5
                @click="stepDown"
            />
        </div>
    </input-wrapper>
</template>

<script setup lang="ts">
import { assert } from '@shining-ui/utils';
import { computed, useTemplateRef } from 'vue';
import { Button } from '../../button';
import { Icon } from '../../icon';
import InputWrapper from '../../input/src/input-wrapper.vue';
import { InputNumberProps } from './type';

const {
    min,
    max,
    disabled,
    readonly,
    step = 1,
    precision,
    minusIcon = 'minus',
    plusIcon = 'plus',
    width: propWidth = 200,
    controls = true,
    controlsPosition = 'side'
} = defineProps<InputNumberProps>()

const width = computed(() => typeof propWidth === 'number'
    ? `${propWidth}px`
    : propWidth
)

const input = useTemplateRef('input')

const modelValue = defineModel<number>()

const limitPrecision = (val: number) => {
    if (Number.isNaN(val)) return 0
    if (Number.isInteger(val)) return val
    const valString = val.toString()
    const dotIndex = valString.indexOf('.')
    return dotIndex > -1
        ? parseFloat(valString.slice(0, numberPrecision.value + dotIndex + 1))
        : val
}

const numberPrecision = computed(() => {
    const stepPrecision = Number.isInteger(step)
        ? 0
        : step.toString().split('.')[1].length
        
    if (typeof precision === 'undefined') return
    if (stepPrecision > precision) {
        assert(false, 'input-number -> step precision should be greater than precision.')
        return
    } else {
        return precision
    }
})

const handleInput = async (e: InputEvent) => {
    const inputValueAsNumber = (e.target as HTMLInputElement).valueAsNumber
    const formattedNumber = limitPrecision(inputValueAsNumber)
    if (modelValue.value === formattedNumber) return
    modelValue.value = !modelValue.value && !inputValueAsNumber
    ? void 0
    : formattedNumber
}

const focus = () => input.value?.focus()
const blur = () => input.value?.blur()

defineExpose({
    focus,
    blur
})

const stepUp = () => {
    if (disabled || readonly) return
    input.value.stepUp()
    modelValue.value = input.value.valueAsNumber
}

const stepDown = () => {
    if (disabled || readonly) return
    input.value.stepDown()
    modelValue.value = input.value.valueAsNumber
}

const emits = defineEmits<{
    (e: 'focus'): void
    (e: 'blur'): void
}>()

const handleBlur = () => {
    emits('blur')

    assert(
        typeof min !== 'number' || typeof max !== 'number' || min < max,
        `[input-number] -> prop 'min' should be less than prop 'max', but got 'min' as ${min} and 'max' as ${max}`
    )

    if (typeof min === 'number' && modelValue.value < min) {
        modelValue.value = min
    } else if (typeof max === 'number' && modelValue.value > max) {
        modelValue.value = max
    }

    const int = Math.floor(modelValue.value)
    const intLength = int ? int.toString().length : 1
    const dot = Number.isInteger(modelValue.value) ? '.' : ''
    const result = `${modelValue.value}${dot}`.padEnd(numberPrecision.value + intLength + 1, '0')
    input.value.value = result

}
</script>