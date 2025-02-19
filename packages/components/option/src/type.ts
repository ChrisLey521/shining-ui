import { IconName } from '../../icon'

interface OptionProps {
    value: string | number | boolean
    label: string | number
    disabled?: boolean
    icon?: IconName
    children?: OptionProps[]
}

export {
    OptionProps
}
