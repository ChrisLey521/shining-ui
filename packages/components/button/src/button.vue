<template>
    <component
        :is="tag"
        :autofocus
        :disabled
        :type
        :class="[
            'sn-button',
            'inline-flex',
            'gap-2',
            'items-center',
            'justify-center',
            'white-nowrap',
            'rounded-4px',
            'focus:outline-none',
            'cursor-pointer',
            'overflow-y-hidden',
            'box-border',
            sizeClass,
            ...variantClass,
            {
                'w-fit': !fullWidth && !circle,
                'rounded-full': round || circle,
                'opacity-50 cursor-not-allowed': disabled,
                'border-none': variant !== DEFAULT_BUTTON_VARIANT,
                plain,
                bg,
                link,
                dark,
            },
        ]"
        :style="{
            color,
            border: border ? `1px solid ${border}` : void 0,
            background
        }">
        <slot v-if="loading" name="loading">
            <Icon :name="loadingIcon" animate-spin />
        </slot>
        <slot name="icon">
            <Icon v-if="icon" :name="icon" />
        </slot>
        <!-- 优先显示 自定义 loading 文案 -->
        <span v-if="loading && loadingText">
            {{  loadingText  }}
        </span>
        <span v-else-if="$slots.default" :class="{ 'tracking-0.25em': shouldAddSpace }">
            <slot />
        </span>
    </component>
</template>

<script lang="ts" setup>
import { DEFAULT_SIZE } from 'constants/common';
import { computed, inject, VNode } from 'vue';
import { Icon } from '../../icon';
import { IconName } from '../../icon/src/const';
import { BUTTON_GROUP_CONTEXT_KEY, darkVariantStyles, DEFAULT_BUTTON_VARIANT, lightVariantStyles, paddingMap, sizeMap } from './const';
import { ButtonGroupContext, ButtonProps } from './type.ts';

const {
    tag = 'button',
    size: propSize = DEFAULT_SIZE,
    variant: propVariant = DEFAULT_BUTTON_VARIANT,
    fullWidth,
    loadingIcon = IconName.Loading,
    autoInsertSpace = false,
    dark = false,
    ghost,
    bg,
    plain,
    link,
    disabled,
    circle,
} = defineProps<ButtonProps>();

const buttonGroupContext = inject<ButtonGroupContext>(BUTTON_GROUP_CONTEXT_KEY)

const size = computed(() => propSize ?? buttonGroupContext.size)
const variant = computed(() => propVariant ?? buttonGroupContext.variant)

const sizeClass = computed(() => {
    const baseSize = sizeMap.get(size.value).slice(Number(!circle));
    if (circle) {
        return baseSize.filter((item) => !item.startsWith('px-') && !item.startsWith('py-'));
    }
    return circle
        ? baseSize
        : [...baseSize, ...(paddingMap.get(size.value) ?? [])]
});

const styleType = computed<'ghost' | 'default' | 'plain' | 'link'>(() => ghost
    ? 'ghost'
    : plain
        ? 'plain'
        : link
            ? 'link'
            : 'default'
)

const baseClass = computed(() => dark ? darkVariantStyles[variant.value][styleType.value] : lightVariantStyles[variant.value][styleType.value])

const variantClass = computed(() => {
    if (disabled) {
        return baseClass.value.filter((base) => !base.startsWith('hover:') && !base.startsWith('active:')).concat(['opacity-50', 'cursor-not-allowed'])
    } else if (ghost && bg) {
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
            return /^\p{Unified_Ideograph}{2,}$/u.test(text.trim())
        }
    }
    return false
})

</script>