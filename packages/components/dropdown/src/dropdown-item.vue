<template>
    <li
        relative
        flex
        flex-row
        gap-2
        items-center
        px-3
        py-1
        :class="[
            seperator,
            disabled ? 'bg-gray-3 cursor-not-allowed' : 'hover:bg-gray-2',
            {
                'bg-blue-2 text-blue-5': active === command,
            },
        ]"
        @click="!disabled && handleClick()">
        <Icon v-if="icon" :name="icon" />
        <slot />
    </li>
</template>

<script setup lang="ts">
import { computed, inject, Ref } from 'vue';
import { type IconName } from '../../icon/src/const';
import Icon from '../../icon/src/icon.vue';

const { command, divided } = defineProps<{
    command: string
    divided?: boolean
    disabled?: boolean
    icon?: IconName
}>()

const seperator = computed(() => divided
    // ? 'before:(content-[""] absolute top-0 left-0 block ml-10px h-1px bg-gray-3) before:w-[calc(100%-20px)]'
    ? 'before:content-[""] before:block before:w-[calc(100%-20px)] before:ml-10px before:h-1px before:bg-gray-3 before:absolute before:top-0 before:left-0'
    : void 0
)

const active = inject<Ref<string>>('active')

const hideOnClick = inject<Ref<boolean>>('hideOnClick')

const select = inject<(cmd: string) => void>('select')
const close = inject<() => void>('close')
const handleClick = () => {
    select(command)
    // 不关闭的条件
    if (!hideOnClick) return
    close()
}
</script>