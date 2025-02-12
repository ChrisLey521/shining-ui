import { POPPER_SIDE, PopperProps } from 'constants/popper';

interface DropdownProps extends PopperProps {
    title?: string
    content?: string
    showArrow?: boolean
    disabled?: boolean
    persistent?: boolean
}

type PlacementSide = keyof typeof POPPER_SIDE

export {
    DropdownProps, PlacementSide
};
