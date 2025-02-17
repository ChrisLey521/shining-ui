<template>
    <div
        flex
        flex-row
        class="sn-button-group"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { DEFAULT_SIZE } from 'constants/common';
import { provide, reactive } from 'vue';
import { BUTTON_GROUP_CONTEXT_KEY, DEFAULT_BUTTON_VARIANT } from './const';
import { ButtonGroupContext } from './type';

const {
    variant = DEFAULT_BUTTON_VARIANT,
    size = DEFAULT_SIZE
} = defineProps<ButtonGroupContext>()

provide(
    BUTTON_GROUP_CONTEXT_KEY,
    reactive({
        variant,
        size
    })
)
</script>

<style scoped lang="scss">
@import url('./styles.scss');
</style>