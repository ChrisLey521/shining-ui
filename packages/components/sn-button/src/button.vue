<template>
    <button :class="[
        'btn',
        sizeClass,
        sizeTypeClass,
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
import { computed } from 'vue';
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
    dark?: boolean
    tag?: string
    color?: string
    border?: string
    background?: string
}

const DEFAULT_SIZE: ButtonSize = ButtonSize.Medium;
const DEFAULT_TYPE: ButtonType = ButtonType.Danger;
// const DEFAULT_NATIVETYPE_TYPE: ButtonNativeType = ButtonNativeType.Button;

const props = defineProps<ButtonProps>();

const sizeClass = computed<string>(() => {
    const sizeMap = new Map([
        [ButtonSize.Large, "btn-large"],
        [ButtonSize.Medium, "btn-medium"],
        [ButtonSize.Small, "btn-small"],
        [ButtonSize.Mini, "btn-mini"],
    ])
    return sizeMap.get(props.size || DEFAULT_SIZE) || "";
})
const sizeTypeClass = computed<string>(() => {
    const typeMap = new Map([
        [ButtonType.Success, "btn-success"],
        [ButtonType.Primary, "btn-primary"],
        [ButtonType.Warning, "btn-warning"],
        [ButtonType.Danger, "btn-danger"],
        [ButtonType.Info, "btn-info"],
    ])
    return typeMap.get(props.type || DEFAULT_TYPE) || "";
})
</script>

<style scoped>
.btn {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    white-space: nowrap;
    line-height: 1;
    border-radius: 4px;
}

.btn-large {
    padding: 10px 20px;
    font-size: 16px;
}

.btn-medium {
    padding: 8px 16px;
    font-size: 14px;
}

.btn-small {
    padding: 6px 12px;
    font-size: 12px;
}

.btn-mini {
    padding: 4px 10px;
    font-size: 12px;
}

.btn-success {
    background-color: #67c23a;
    color: #fff;
    border: 1px solid #67c23a;
}

.btn-primary {
    background-color: #409eff;
    color: #fff;
    border: 1px solid #409eff;
}

.btn-warning {
    background-color: #e6a23c;
    color: #fff;
    border: 1px solid #e6a23c;
}

.btn-danger {
    background-color: #f56c6c;
    color: #fff;
    border: 1px solid #f56c6c;
}

.btn-info {
    background-color: #909399;
    color: #fff;
    border: 1px solid #909399;
}

.btn.circle {
    border-radius: 50%;
    padding: 0px;
    width: 40px;
    height: 40px;
}

.btn.text {
    background: none;
    border: none;
    color: #409eff;
}

.btn.plain {
    background: none;
    border: 1px solid #dcdfe6;
    color: #606266;
}
</style>