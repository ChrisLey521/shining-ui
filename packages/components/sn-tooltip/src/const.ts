// const DEFAULT_NATIVETYPE_TYPE: ButtonNativeType = ButtonNativeType.Button;

import { Theme } from "constants";

enum Placement {
    Top = 'top',
    TopStart = 'top-start',
    TopEnd = 'top-end',
    Bottom = 'bottom',
    BottomStart = 'bottom-start',
    BottomEnd = 'bottom-end',
    Left = 'left',
    LeftStart = 'left-start',
    LeftEnd = 'left-end',
    Right = 'right',
    RightStart = 'right-start',
    RightEnd = 'right-end',
}
const DEFAULT_PLACEMENT: Placement = Placement.Top;


enum Trigger {
    Hover = 'hover',
    Click = 'click',
    Focus = 'focus',
    Contextmenu = 'contextmenu',
}

const DEFAULT_TRIGGER: Trigger = Trigger.Hover;

const themeMap: Map<Theme, string[]> = new Map<Theme, string[]>([
    [Theme.Dark, ['bg-neutral-7', 'text-white']],
    [Theme.Light, ['bg-white', 'text-gray-9', 'border', 'border-solid', 'border-gray-3']],
]);

const arrowThemeMap: Map<Theme, string[]> = new Map<Theme, string[]>([
    [Theme.Dark, ['bg-neutral-7', 'text-white', 'border-neutral-7']],
    [Theme.Light, ['bg-white', 'border-gray-3']],
]);


const placementMap: Map<Placement, string[]> = new Map<Placement, string[]>([
    [Placement.Top, ['bottom-full', 'left-1/2', 'transform', '-translate-x-1/2', 'mb-2']],
    [Placement.TopStart, ['bottom-full', 'left-0', 'mb-2']],
    [Placement.TopEnd, ['bottom-full', 'right-0', 'mb-2']],

    [Placement.Bottom, ['top-full', 'left-1/2', 'transform', '-translate-x-1/2', 'mt-2']],
    [Placement.BottomStart, ['top-full', 'left-0', 'mt-2']],
    [Placement.BottomEnd, ['top-full', 'right-0', 'mt-2']],

    [Placement.Left, ['right-full', 'top-1/2', 'transform', '-translate-y-1/2', 'mr-2']],
    [Placement.LeftStart, ['right-full', 'top-0', 'mr-2']],
    [Placement.LeftEnd, ['right-full', 'bottom-0', 'mr-2']],

    [Placement.Right, ['left-full', 'top-1/2', 'transform', '-translate-y-1/2', 'ml-2']],
    [Placement.RightStart, ['left-full', 'top-0', 'ml-2']],
    [Placement.RightEnd, ['left-full', 'bottom-0', 'ml-2']],
]);

const arrowPlacementMap: Map<Placement, string[]> = new Map<Placement, string[]>([
    [Placement.Top, ['bottom-0', 'left-1/2', 'transform', '-translate-x-1/2', 'translate-y-1/2', 'border-b-solid', 'border-r-solid', 'border-b-1', 'border-r-1',]],
    [Placement.TopStart, ['bottom-0', 'left-2', 'transform', 'translate-y-1/2', 'border-b-solid', 'border-r-solid', 'border-b-1', 'border-r-1',]],
    [Placement.TopEnd, ['bottom-0', 'right-2', 'transform', 'translate-y-1/2', 'border-b-solid', 'border-r-solid', 'border-b-1', 'border-r-1',]],

    [Placement.Bottom, ['top-0', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'border-t-solid', 'border-l-solid', 'border-t-1', 'border-l-1',]],
    [Placement.BottomStart, ['top-0', 'left-2', 'transform', '-translate-y-1/2', 'border-t-solid', 'border-l-solid', 'border-t-1', 'border-l-1',]],
    [Placement.BottomEnd, ['top-0', 'right-2', 'transform', '-translate-y-1/2', 'border-t-solid', 'border-l-solid', 'border-t-1', 'border-l-1',]],

    [Placement.Left, ['right-0', 'top-1/2', 'transform', 'translate-x-1/2', '-translate-y-1/2', 'border-t-solid', 'border-r-solid', 'border-t-1', 'border-r-1',]],
    [Placement.LeftStart, ['right-0', 'top-2', 'transform', 'translate-x-1/2', 'border-t-solid', 'border-r-solid', 'border-t-1', 'border-r-1',]],
    [Placement.LeftEnd, ['right-0', 'bottom-2', 'transform', 'translate-x-1/2', 'border-t-solid', 'border-r-solid', 'border-t-1', 'border-r-1',]],

    [Placement.Right, ['left-0', 'top-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'border-b-solid', 'border-l-solid', 'border-b-1', 'border-l-1',]],
    [Placement.RightStart, ['left-0', 'top-2', 'transform', '-translate-x-1/2', 'border-b-solid', 'border-l-solid', 'border-b-1', 'border-l-1',]],
    [Placement.RightEnd, ['left-0', 'bottom-2', 'transform', '-translate-x-1/2', 'border-b-solid', 'border-l-solid', 'border-b-1', 'border-l-1',]],
]);


export {
    Placement,
    Trigger,
    DEFAULT_PLACEMENT,
    DEFAULT_TRIGGER,
    themeMap,
    arrowThemeMap,
    placementMap,
    arrowPlacementMap,
};

