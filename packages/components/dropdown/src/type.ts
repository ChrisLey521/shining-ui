import { Placement, Variant } from 'constants/common';
import { FloatingProps, POPPER_SIDE } from 'constants/floating';

enum YPlacement {
    TopStart = Placement.TopStart,
    Top = Placement.Top,
    TopEnd = Placement.TopEnd,
    BottomStart = Placement.BottomStart,
    Bottom = Placement.Bottom,
    BottomEnd = Placement.BottomEnd
}

interface DropdownProps extends Omit<FloatingProps, 'placement'> {
    disabled?: boolean
    persistent?: boolean
    placement?: YPlacement
    hideOnClick?: boolean
    splitButton?: boolean
    variant?: Variant
}

type PlacementSide = keyof typeof POPPER_SIDE

export {
    DropdownProps, PlacementSide
};

