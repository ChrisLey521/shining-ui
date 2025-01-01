<template>
    <button :class="[
        'btn',
        sizeClass,
        sizeTypeClass,
        bgColor,
        {
            'rounded-20px': round,
            circle: circle,
            loading: loading,
            disabled: disabled,
            text: text,
            plain: plain,
            bg: bg,
            link: link,
            dark: dark,
            autoInsertSpace: autoInsertSpace
        }]
        " :style="{ color, border, background }" :disabled="disabled || loading" :autofocus="autofocus"
        :nativeType="nativeType">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import { DEFAULT_SIZE, DEFAULT_VARIANT, Size, Variant } from 'constants';
import { computed } from 'vue';
import { ButtonProps } from './type.ts';

const props = defineProps<ButtonProps>();

const sizeClass = computed<string>(() => {
    const sizeMap = new Map([
        [Size.Large, "btn-large"],
        [Size.Medium, "btn-medium"],
        [Size.Small, "btn-small"],
        [Size.Mini, "btn-mini"],
    ])
    return sizeMap.get(props.size || DEFAULT_SIZE) || "";
})
const sizeTypeClass = computed<string>(() => {
    const typeMap = new Map([
        [Variant.Success, "btn-success"],
        [Variant.Primary, "btn-primary"],
        [Variant.Warning, "btn-warning"],
        [Variant.Danger, "btn-danger"],
        [Variant.Info, "btn-info"],
    ])
    return typeMap.get(props.variant || DEFAULT_VARIANT) || "";
})

const colorMap = new Map<Variant, string[]>([
    [Variant.Primary, ['bg-blue-7', 'hover:bg-blue-5', 'active:bg-blue-9']],
    [Variant.Success, ['bg-green-7', 'hover:bg-green-5', 'active:bg-green-9']],
    [Variant.Warning, ['bg-orange-7', 'hover:bg-orange-5', 'active:bg-orange-9']],
    [Variant.Danger, ['bg-red-7', 'hover:bg-red-5', 'active:bg-red-9']],
    [Variant.Info, ['bg-gray-7', 'hover:bg-gray-5', 'active:bg-gray-9']],
])

const bgColor = computed(() => colorMap.get(props.variant))

</script>

<style scoped>
@import url('./style.css');
</style>