import { Size } from 'constants/common'
import { IconName } from '../../icon'
import { CommonInputProps } from '../../input/src'

interface InputNumberProps extends CommonInputProps {
    min?: number
    max?: number
    step?: number
    stepStrictly?: boolean
    controls?: boolean
    precision?: number
    size?: `${Size}`
    controlsPosition?: 'side' | 'right'
    minusIcon?: IconName
    plusIcon?: IconName
    width?: number | string
}

export {
    InputNumberProps
}
