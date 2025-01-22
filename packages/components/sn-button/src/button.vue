<template>
    <component :is="tag" :class="[
        'inline-flex',
        'items-center',
        'justify-center',
        'white-nowrap',
        'border-none',
        'rounded-4px',
        'focus:outline-none',
        'cursor-pointer',
        'overflow-y-hidden',
        'box-border',
        sizeClass,
        ...variantClass,
        {
            'rounded-full': round || circle,
            'opacity-50 cursor-not-allowed': disabled,
            plain,
            bg,
            link,
            dark,
        },
    ]" :autofocus="autofocus" :disabled="disabled" :style="{ color, border, background }" :type="type">
        <slot v-if="loading" name="loading">
            <Icon :name="loadingIcon" />
        </slot>
        <slot name="icon">
            <Icon v-if="icon" :name="icon" />
        </slot>
        <span v-if="$slots.default" :class="{ 'tracking-0.25em': shouldAddSpace }">
            <slot />
        </span>
    </component>
</template>

<script lang="ts" setup>
import { computed, VNode } from 'vue';
import { DEFAULT_SIZE } from 'constants';
import { ButtonProps } from './type.ts';
import { darkVariantStyles, DEFAULT_BUTTON_VARIANT, lightVariantStyles, sizeMap } from './const';
import { Icon } from '../../sn-icon';
import { IconName } from '../../sn-icon/src/const';

const {
    tag = 'button',
    size = DEFAULT_SIZE,
    variant = DEFAULT_BUTTON_VARIANT,
    loadingIcon = IconName.Loading,
    autoInsertSpace = false,
    dark = false,
    text,
    bg,
    plain,
    link,
    disabled,
    circle,
} = defineProps<ButtonProps>();

const sizeClass = computed(() => {
    const baseSize = sizeMap.get(size).slice(Number(!circle));
    if (circle) {
        return baseSize.filter((item) => !item.startsWith('px-') && !item.startsWith('py-'));
    }
    return baseSize;
});

const styleType = computed<'text' | 'default' | 'plain' | 'link'>(() => text
    ? 'text'
    : plain
        ? 'plain'
        : link
            ? 'link'
            : 'default'
)

const baseClass = computed(() => dark ? darkVariantStyles[variant][styleType.value] : lightVariantStyles[variant][styleType.value])

const variantClass = computed(() => {
    if (disabled) {
        return baseClass.value.filter((base) => !base.startsWith('hover:') && !base.startsWith('active:')).concat(['opacity-50', 'cursor-not-allowed'])
    } else if (text && bg) {
        const bg = dark ? 'bg-neutral-8/80' : 'bg-gray-1/80';
        return baseClass.value.filter((base) => !base.startsWith('bg-')).concat([bg])
    } else {
        return baseClass.value
    }
});

const slots = defineSlots<{ default(): VNode[] }>()
const shouldAddSpace = computed(() => {
    const defaultSlot = slots.default?.()
    if (autoInsertSpace && defaultSlot?.length === 1) {
        const slot = defaultSlot[0]
        if (slot?.type === Symbol.for('v-txt') && typeof slot?.children === 'string') {
            const text = slot?.children as string
            console.log(/^\p{Unified_Ideograph}{2,}$/u.test(text.trim()), /^\p{Unified_Ideograph}{2,}$/u.test('确定保存'), text, text.trim() === '确定保存');
            return /^\p{Unified_Ideograph}{2,}$/u.test(text.trim())
        }
    }
    return false
})

</script>