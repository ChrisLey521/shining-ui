import { IconName } from '../../icon'

interface OptionProps {
    value: string | number | boolean
    label: string | number
    disabled?: boolean
    icon?: IconName
    children?: OptionProps[]
}

const isOptionProps = (value: OptionProps | OptionProps[]) => !Array.isArray(value)

export {
    isOptionProps, OptionProps
}

