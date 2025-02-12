import { Size, Variant } from 'constants/common'
import { IconName } from '../../icon/src/const'
import { ButtonNativeType } from './const'



interface ButtonProps {
    size?: Size
    variant?: Variant
    fullWidth?: boolean
    plain?: boolean
    text?: boolean
    bg?: boolean
    link?: boolean
    round?: boolean
    circle?: boolean
    loading?: boolean
    loadingIcon?: `${IconName}`
    disabled?: boolean
    icon?: `${IconName}`
    autofocus?: boolean
    type?: ButtonNativeType
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

