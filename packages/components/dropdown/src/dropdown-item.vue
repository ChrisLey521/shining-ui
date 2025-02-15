<template>
    <li :class="{ '!bg-blue-3 text-blue-5': active === command }" @click="handleClick">
        <slot />
    </li>
</template>

<script setup lang="ts">
import { inject, Ref } from 'vue';

const { command } = defineProps<{
    command: string
}>()

const active = inject<Ref<string>>('active')

const select = inject<(cmd: string) => void>('select')
const close = inject<() => void>('close')
const handleClick = () => {
    select(command)
    // 不关闭的条件
    close()
}
</script>