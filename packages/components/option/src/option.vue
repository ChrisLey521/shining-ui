<template>
    <DropdownItem
        :command="value"
        :hide-on-click="!selectContext.multiple"
        :icon>
        <div flex flex-row flex-nowrap items-center justify-between flex-1>
            {{ label }}
            <Icon
                v-if="selectContext.value === value"
                name="check"
                :size="20"
                class="!text-green-7"
                flex-shrink-0
            />
        </div>
    </DropdownItem>
</template>

<script setup lang="ts">
import { computed, inject, provide, Reactive } from 'vue';
import { DropdownItem } from '../../dropdown';
import { type IconName, Icon } from '../../icon';
import { SelectContext, selectContextKey } from '../../select';

type BasicValue = string | number | boolean

defineProps<{
    value: BasicValue
    label: string | number
    icon: IconName
}>()

const selectContext = inject<Reactive<SelectContext>>(selectContextKey)

// 覆盖 dropdown 向 dropdown-item 注入的 active
provide('active', computed(() => selectContext.value))

</script>