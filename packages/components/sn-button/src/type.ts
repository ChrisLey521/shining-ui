import { Size, Variant } from 'constants'
import { IconName } from '../../sn-icon/src/const'
import { ButtonNativeType } from './const'

interface ButtonProps {
    size?: Size
    fullWidth?: boolean
    variant?: Variant
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

