<template>
    <div class="
            b
            b-solid
            b-gray-3
            rounded-lg
        ">
        <div :class="[
            'grid',
            'gap-2',
            'grid-cols-1',
            gridCols,
            'p-5',
            'overflow-x-auto'
        ]">
            <slot name="exhibitions" />
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
                <!-- <code-fence :content="code" /> -->
                <div class="example-source-wrapper">
                    <div class="example-source" v-html="decodeURIComponent(code)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
const { code = '', columns = 1 } = defineProps<{
    code?: string
    columns?: ColumnCount
    path?: string
}>()

const gridCols = computed(() => {
    const gridColMap = [
        'sm:grid-cols-1',
        'sm:grid-cols-2',
        'sm:grid-cols-3',
        'sm:grid-cols-4',
        'sm:grid-cols-5',
        'sm:grid-cols-6',
        'sm:grid-cols-7',
        'sm:grid-cols-8',
        'sm:grid-cols-9',
        'sm:grid-cols-10',
    ]
    return gridColMap[columns - 1]
})

const codeCollopsed = ref(true)
</script>