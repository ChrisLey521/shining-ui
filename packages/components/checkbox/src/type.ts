import { CommonInputProps } from '../../input';

interface CheckboxProps extends CommonInputProps {
    value?: string | number | boolean
    label?: string
    labelAlign?: 'left' | 'right'
}

export {
    CheckboxProps
};
