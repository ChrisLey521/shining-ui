import { CommonInputProps } from '../../input';

interface RadioProps extends CommonInputProps {
    value?: string | number | boolean
    label?: string
    labelAlign?: 'left' | 'right'
}

export {
    RadioProps
};
