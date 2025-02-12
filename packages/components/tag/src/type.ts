import { Size, Theme, Variant } from 'constants/common';

interface TagProps {
    variant?: Variant;
    closable?: boolean;
    "disable-transitions"?: boolean;
    hit?: boolean;
    color?: string;
    border?: string;
    background?: string;
    size?: Size;
    round?: boolean;
    theme?: Theme;
    onClose?: () => void
}

export {
    TagProps
};
