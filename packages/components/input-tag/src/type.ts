import { Size, Trigger, Variant } from 'constants/common';
import { CommonInputProps } from '../../input';

interface TagInputProps extends CommonInputProps {
    value?: string[]
    variant?: `${Variant}`
    size?: Size
    max?: number
    maxDisplayedCount?: number
    triggerMore?: `${Trigger}`
    triggerKey?: 'enter' | 'space'
    draggable?: boolean
}

export {
    TagInputProps
};
