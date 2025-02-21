import { Size } from 'constants/common'
import { InputTypeHTMLAttribute } from 'vue'
import { IconName } from '../../icon'

interface CommonInputProps {
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    maxLength?: number
    minLength?: number
    showLengthLimit?: boolean
    autocomplete?: string // on/off
    autofocus?: boolean
    form?: string
    name?: string
    readonly?: boolean
    tabindex?: number
}

interface InputProps extends CommonInputProps {
    type: InputTypeHTMLAttribute
    size?: Size
    formatter?: (value: string) => string
    parser?: (value: string) => string
    prefixIcon?: IconName
    suffixIcon?: IconName
}

export {
    CommonInputProps, InputProps
}

