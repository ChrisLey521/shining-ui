import { Placement, Trigger } from 'constants/common'
import { POPPER_SIDE } from 'constants/floating'
import { Ref } from 'vue'

interface FloatingVueReference {
    reference?: Ref<HTMLElement>,
    floating?: Ref<HTMLElement>,
    floatingArrow?: Ref<HTMLElement>
}

interface FloatingVueOptions {
    placement?: `${Placement}`
    offset?: number
    showArrow?: boolean
    reference?: Ref<HTMLElement> | HTMLElement
    floating?: Ref<HTMLElement> | HTMLElement
    floatingArrow?: Ref<HTMLElement> | HTMLElement
}

interface FloatingEventsOptions {
    trigger: `${Trigger}`
    disabled?: boolean
    reference?: Ref<HTMLElement>
    actions: {
        open: () => void
        close: () => void
        toggle: () => void
    }
}

type PlacementSide = keyof typeof POPPER_SIDE

export { FloatingEventsOptions, FloatingVueOptions, FloatingVueReference, PlacementSide }

