<template>
    <div class="relative" @mouseenter="showTooltip" @mouseleave="hideTooltip">
        <slot />
        <div v-if="isvisible" :class="[
            'absolute',
            'text-xs',
            'p-1.5',
            'rounded',
            'z-20',
            'whitespace-nowrap',
            ...placementClass,
            ...themeClass
        ]">
            <div v-if="$slots.content" class="relative z-19">
                <slot name="content" />
            </div>
            <div v-else-if="rawContent" v-html="content" class="relative z-19"></div>
            <div v-else v-text="content" class="relative z-19"></div>
            <div :class="[
                'absolute',
                'h-2',
                'w-2',
                'transform',
                'rotate-45',
                'z-18',
                ...arrowPlacementClass,
                ...arrowThemeClass
            ]"></div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref, computed } from "vue";
import { TooltipProps } from "./type";
import { arrowPlacementMap, arrowThemeMap, Placement, placementMap, themeMap } from "./const";
import { DEFAULT_THEME } from "constants";

const { content, placement = Placement.Top, theme = DEFAULT_THEME, rawContent } = defineProps<TooltipProps>();

const isvisible = ref(false);

const themeClass = computed(() => themeMap.get(theme) || []);
const arrowThemeClass = computed(() => arrowThemeMap.get(theme) || []);


const placementClass = computed(() => placementMap.get(placement) || []);


const arrowPlacementClass = computed(() => arrowPlacementMap.get(placement) || []);

const showTooltip = () => {
    isvisible.value = true;
};

const hideTooltip = () => {
    isvisible.value = false;
};
</script>