import { Size, Variant } from 'constants'
import { ButtonNativeType } from './const'



interface ButtonProps {
    size?: Size
    variant?: Variant
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

export {
    ButtonNativeType,
    ButtonProps
}

