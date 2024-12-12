<template>
    <button :class="round ? 'round-button' : ''">

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

<style scoped>
.round-button {
    border-radius: 10px;
}
</style>