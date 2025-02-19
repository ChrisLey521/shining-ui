<template>
    <Dropdown
        trigger="click"
        :delay="0"
        @command="handleSelect">
        <input-impl
            ref="selectRef"
            v-model="value"
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
import { Option, OptionProps } from '../../option';
import { selectContextKey } from './const';
import SelectPanel from './panel.vue';
import { BasicValue, isBasicValues, SelectEvents, SelectValue } from './type';
const {
    // 不指定默认值时, 为什么默认值是 false？
    value: propValue = void 0,
    multiple
} = defineProps<{
    multiple?: boolean
    value?: SelectValue
    options: OptionProps[]
}>()

// console.log('propVal -> ', propValue, multiple)

const modelValue = defineModel<SelectValue>()

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
    if (!isBasicValues(modelValue.value)) {
        modelValue.value = selectedValue
        console.log('select -> ', selectedValue, propValue, modelValue.value)
        return emits('select', selectedValue)
    }

    const hasSelected = (modelValue.value as BasicValue[]).includes(selectedValue)
    if (hasSelected) {
        modelValue.value = (modelValue.value  as BasicValue[]).filter(val => val !== selectedValue)
    } else {
        (modelValue.value as BasicValue[]).push(selectedValue)
    }
    emits('select', selectedValue, modelValue.value)
}

</script>