import { Placement, Trigger } from 'constants/common'
import { POPPER_SIDE } from 'constants/popper'
import { Ref } from 'vue'

interface FloatingVueReference {
    reference?: Ref<HTMLElement>,
    floating?: Ref<HTMLElement>,
    floatingArrow?: Ref<HTMLElement>
}

interface FloatingVueOptions {
    placement?: Placement
    offset?: number
    trigger?: Trigger
    disabled?: boolean
    /** v-model:visible */
    modelVisible?: Ref<boolean>
    /** props.visible */
    controlledVisible?: boolean
}

interface FloatingEventsOptions {
    floating?: Ref<HTMLElement>
    reference?: Ref<HTMLElement>
    trigger: Trigger
    disabled?: boolean
    modelVisible?: Ref<boolean>
    controlledVisible?: boolean
}

type PlacementSide = keyof typeof POPPER_SIDE

export {
    FloatingEventsOptions, FloatingVueOptions, FloatingVueReference, PlacementSide
}
