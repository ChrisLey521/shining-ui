import { Size, Theme, Variant } from 'constants/common';

interface TagProps {
    variant?: `${Variant}`;
    closable?: boolean;
    disableTransitions?: boolean;
    hit?: boolean;
    color?: string;
    border?: string;
    background?: string;
    size?: `${Size}`;
    round?: boolean;
    theme?: `${Theme}`;
    draggable?: boolean
    onClose?: () => void
}

export {
    TagProps
};

