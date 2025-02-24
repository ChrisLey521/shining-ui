import { Size } from 'constants/common'
import { InputTypeHTMLAttribute } from 'vue'
import { IconName } from '../../icon'

interface CommonInputProps {
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    maxlength?: number
    minlength?: number
    showWordCount?: boolean
    // 原生属性
    autocomplete?: 'on' | 'off'
    autofocus?: boolean
    form?: string
    name?: string
    readonly?: boolean
    tabindex?: number
    ariaLabel?: string
    id?: string
}

interface InputProps extends CommonInputProps {
    type: InputTypeHTMLAttribute
    size?: Size
    formatter?: (value: string) => string
    parser?: (value: string) => string
    prefixIcon?: IconName
    suffixIcon?: IconName
}

interface InputEvents {
    (e: 'change', newValue: string, oldValue: string): void
    (e: 'prefix-icon-click'): void
    (e: 'suffix-icon-click'): void
}

export {
    CommonInputProps, InputEvents, InputProps
}

