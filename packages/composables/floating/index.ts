import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';
import { Trigger } from 'constants/common';
import { POPPER_SIDE } from 'constants/floating';
import { isElement } from 'lodash-unified';
import { computed, isRef, Ref, ref } from 'vue';
import { FloatingEventsOptions, FloatingVueOptions, PlacementSide } from './type';

const normalizeRef = (reference?: Ref<unknown> | HTMLElement) => {
    if (isRef(reference)) return reference
    if (isElement) return ref(reference)
    return ref(null)
}

const useFloatingVue = ({
    placement,
    showArrow,
    offset: popperOffset = 10,
    reference,
    floating,
    floatingArrow
}: FloatingVueOptions) => {
    reference = normalizeRef(reference)
    floating = normalizeRef(floating)
    floatingArrow = normalizeRef(floatingArrow)

    const middleware = computed(() => [
        offset(popperOffset),
        flip(),
        shift(),
        ...(showArrow ? [arrow({ element: floatingArrow })] : [])
    ])

    const { floatingStyles, middlewareData, placement: computedPlacement } = useFloating(reference, floating, {
        placement,
        middleware,
        whileElementsMounted: autoUpdate
    });

    const mainPlacement = computed(() => computedPlacement.value.split('-')[0])

    // [style, classes]
    const arrowPositionStyles= computed<Record<PlacementSide, string>>(() => {
        // 箭头位置
        const { x: arrowX = 0, y: arrowY = 0 } = middlewareData.value.arrow ?? {};

        const staticSide: PlacementSide = POPPER_SIDE[mainPlacement.value];

        const styles = {
            left: arrowX ? `${arrowX}px` : '',
            top: arrowY ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
        }

        return styles
    })
    
    const arrowBorderClasses = computed(() => {
        // 根据placement得到箭头不需要的边框
        const invisibleArrowBorder = {
            top: ['b-t-transparent', 'b-l-transparent'],
            bottom: ['b-b-transparent', 'b-r-transparent'],
            left: ['b-b-transparent', 'b-l-transparent'],
            right: ['b-t-transparent', 'b-r-transparent'],
        }
        return invisibleArrowBorder[mainPlacement.value]
    })

    return {
        reference,
        floating,
        floatingArrow,
        arrowPositionStyles,
        arrowBorderClasses,
        floatingStyles,
    }
}

const useFloatingEvents = ({
    trigger = Trigger.Hover,
    disabled,
    hasModelVisible,
    controlled,
    emits
}: FloatingEventsOptions) => {
    
    // const visible = ref(modelVisible?.value ?? controlledVisible)

    const { showFloatingEvent, hideFloatingEvent } = useFloatingActions(trigger)

    const toggleFloating = (action: Parameters<typeof emits>[0]) => {
        if (disabled) return
        // 优先级策略: v-model:visible > controlledVisible (受控) > visible

        // 没有 v-model:visible
        if (!hasModelVisible) {
            // 传入了 props.visible , 则由 props.visible 决定，组件不能更改可见性
            if (controlled) return
            // 没有传入 props.visible 则由组件自己决定
            // visible.value = shouldShowFloating
            emits(action)
            return
        }
        emits(action)
    }

    const showFloating = (e: MouseEvent) => {
        e.preventDefault()
        toggleFloating('open')
    }

    const hideFloating = () => {
        toggleFloating('close')
    }

    const handleReferenceClick = () => {
        if (trigger !== Trigger.Click) return
        toggleFloating('toggle')
    }

    return {
        /** 用于 @[event]="showFloating" 动态事件绑定 */
        showFloatingEvent,
        hideFloatingEvent,
        showFloating,
        hideFloating,
        handleReferenceClick,
    }
}

const useFloatingActions = (trigger: Trigger) => {
    const showFloatingEvent = computed(() => {
        const showFloatingEventMap = new Map<Trigger, string>([
            [Trigger.Hover, 'mouseenter'],
            [Trigger.Focus, 'focus'],
            [Trigger.ContextMenu, 'contextmenu']
        ])

        return showFloatingEventMap.get(trigger)
    })

    const hideFloatingEvent = computed(() => {
        const showFloatingEventMap = new Map<Trigger, string>([
            [Trigger.Hover, 'mouseleave'],
            [Trigger.Focus, 'blur']
        ])

        return showFloatingEventMap.get(trigger) ?? void 0
    })

    return {
        showFloatingEvent,
        hideFloatingEvent
    }
}

export { useFloatingActions, useFloatingEvents, useFloatingVue };

