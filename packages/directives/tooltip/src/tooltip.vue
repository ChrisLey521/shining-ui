<template>
    <div
        :class="themeStyles"
        rounded-md
        b
        b-solid
        py-1
        px-2
    >
        <component v-if="contentAsComponent" :is="content" />
        <div v-else-if="contentAsHTML" v-html="content" />
        <template v-else>{{ content }}</template>
        <div
            id="__tooltip-arrow"
            :class="themeStyles"
            absolute
            b
            b-solid
            w-8px
            h-8px
            transform-rotate-45
        />
    </div>
</template>

<script setup lang=ts>
import { computed } from 'vue';
import { Theme } from '../../../constants';
import { TooltipProps } from './type';

const {
    theme = Theme.Dark
} = defineProps<{
    content: string
    theme?: TooltipProps['theme']
    contentAsHTML?: boolean
    contentAsComponent?: boolean
}>()

const themeStyles = computed(() => {
    const bgMap = new Map<TooltipProps['theme'], string[]>([
        [Theme.Dark, ['bg-dark-5', 'text-white', 'b-gray-6']],
        [Theme.Light, ['bg-white', 'text-blue', 'b-gray-2']]
    ])

    return bgMap.get(theme)
})
</script>