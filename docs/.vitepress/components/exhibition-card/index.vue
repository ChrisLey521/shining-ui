<template>
    <div class="
            b
            b-solid
            b-gray-3
            rounded-lg
        ">
        <div
            :style="{
                'grid-template-columns': `repeat(${columns}, minmax(0, 1fr))`
            }"
            class="
                p-5
                grid
                gap-2
            ">
            <slot name="exhibition" />
        </div>
        <div>
            <div :class="[
                'flex',
                'flex-row',
                'gap-2',
                'justify-end',
                'items-center',
                'h-40px',
                'px-5',
                'b-t-solid',
                'b-y',
                'b-y-gray-3',
                {
                    'b-b-solid': !codeCollopsed
                }
            ]">
                <sn-button
                    icon="magic-stick"
                    circle
                    text
                />
                <sn-button
                    icon="copy"
                    circle
                    text
                />
                <sn-button
                    :icon="codeCollopsed
                        ? 'arrow-down-bold'
                        : 'arrow-up-bold'
                    "
                    circle
                    text
                    @click="codeCollopsed = !codeCollopsed"
                />
            </div>
            <div :class="[
                'box-border',
                codeCollopsed ? 'h-0' : 'h-fit p-5',
                'overflow-hidden'
            ]">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { columns = 1 } = defineProps<{columns?: number}>()

const codeCollopsed = ref(true)
</script>