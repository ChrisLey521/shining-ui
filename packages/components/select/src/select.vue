<template>
    <Dropdown
        trigger="click"
        :delay="0"
        @command="handleSelect">
        <input-impl
            ref="selectRef"
            :value="inputValue"
            :editable="false"
        />
        <template #dropdown>
            <SelectPanel>
                <Option
                    v-for="{ value: optionValue, label, disabled, icon } in options"
                    :key="String(optionValue)"
                    :value="optionValue"
                    :icon
                    :label
                    :disabled
                />
            </SelectPanel>
        </template>
    </Dropdown>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-unified';
import { computed, provide, reactive, useTemplateRef, watch } from 'vue';
import { Dropdown } from '../../dropdown';
import { InputImpl } from '../../input';
import { isOptionProps, Option, OptionProps } from '../../option';
import { selectContextKey } from './const';
import SelectPanel from './panel.vue';
import { BasicValue, isBasicValue, SelectEvents, SelectValue } from './type';
const {
    // 不指定默认值时, 为什么默认值是 false？
    value: propValue = void 0,
    multiple,
    options = [],
    defaultText
} = defineProps<{
    multiple?: boolean
    value?: SelectValue
    options: OptionProps[]
    defaultText?: string
}>()

const modelValue = defineModel<SelectValue>()

const selectedOptions = computed<OptionProps | OptionProps[]>(() => {
    if (isBasicValue(modelValue.value)) {
        return options.find(opt => opt.value === modelValue.value)
    }
    return options.filter(opt => (modelValue.value as BasicValue[]).includes(opt.value))
})

const inputValue = computed(() => isOptionProps(selectedOptions.value)
    ? (selectedOptions.value as OptionProps)?.label ?? defaultText
    : (selectedOptions.value as OptionProps[]).map(({ label }) => label)
)

watch(inputValue, console.log)

const value = computed({
    get: () => propValue ?? modelValue.value,
    set: (newValue) => {
        modelValue.value = newValue
    }
})

const emits = defineEmits<SelectEvents>()

watch(value, (val, oldVal) => {
    if (isEmpty(val)) return
    emits('change', val, oldVal)
})

const select = useTemplateRef('selectRef')
provide(selectContextKey, reactive({
    select,
    value,
    multiple: computed(() => multiple)
}))

const handleSelect = (selectedValue: BasicValue) => {
    if (isBasicValue(modelValue.value)) {
        modelValue.value = selectedValue
        return emits('select', selectedValue)
    }

    const hasSelected = modelValue.value.includes(selectedValue)
    if (hasSelected) {
        modelValue.value = modelValue.value.filter(val => val !== selectedValue)
    } else {
        modelValue.value.push(selectedValue)
    }
    emits('select', selectedValue, modelValue.value)
}

</script>