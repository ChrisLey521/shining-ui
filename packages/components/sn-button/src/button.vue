<template>
    <button text-red m-1 :class="round ? 'rounded-20px' : ''">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import { ButtonSize, ButtonType, ButtonNativeType } from './type.ts'

interface ButtonProps {
    size?: ButtonSize
    type?: ButtonType
    plain?: boolean
    text?: boolean
    bg?: boolean
    link?: boolean
    round?: boolean
    circle?: boolean
    loading?: boolean
    loadingIcon?: string
    disabled?: boolean
    icon?: string
    autofocus?: boolean
    nativeType?: ButtonNativeType
    autoInsertSpace?: boolean
    color?: string
    dark?: boolean
    tag?: string
}
defineProps<ButtonProps>()
</script>
