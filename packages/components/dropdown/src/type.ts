import { FloatingProps, POPPER_SIDE } from 'constants/floating';

interface DropdownProps extends FloatingProps {
    disabled?: boolean
    persistent?: boolean
}

type PlacementSide = keyof typeof POPPER_SIDE

export {
    DropdownProps, PlacementSide
};

