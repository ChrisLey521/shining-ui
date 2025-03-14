import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';
import { Trigger } from 'constants/common';
import { POPPER_SIDE } from 'constants/floating';
import { isElement } from 'lodash-unified';
import { computed, isRef, onBeforeUnmount, onMounted, Ref, ref } from 'vue';
import { attachEvent, removeEvent } from '../../utils';
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
    reference,
    actions
}: FloatingEventsOptions) => {
    
    const { showFloatingEvent, hideFloatingEvent } = useFloatingActions(trigger)

    const toggleFloating = (action: keyof typeof actions) => {
        if (disabled) return
        actions[action]?.()
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

    if (!reference) {
        return {
            /** 用于 @[event]="showFloating" 动态事件绑定 */
            showFloatingEvent,
            hideFloatingEvent,
            showFloating,
            hideFloating,
            handleReferenceClick,
        }
    }
    onMounted(() => {
        console.log('挂载')
        const el = reference.value
        if (!el) return
        attachEvent(el, showFloatingEvent.value, showFloating)
        attachEvent(el, hideFloatingEvent.value, hideFloating)
        attachEvent(el, 'click', handleReferenceClick)
    })

    onBeforeUnmount(() => {
        console.log('卸载')
        const el = reference.value
        if (!el) return
        removeEvent(el, showFloatingEvent.value, showFloating)
        removeEvent(el, hideFloatingEvent.value, hideFloating)
        removeEvent(el, 'click', handleReferenceClick)
    })

    return {
        /** 用于 @[event]="showFloating" 动态事件绑定 */
        showFloatingEvent,
        hideFloatingEvent,
        showFloating,
        hideFloating,
        handleReferenceClick,
    }
}

const useFloatingActions = (trigger: `${Trigger}`) => {
    const showFloatingEvent = computed(() => {
        const showFloatingEventMap = new Map<`${Trigger}`, string>([
            [Trigger.Hover, 'mouseenter'],
            [Trigger.Focus, 'focus'],
            [Trigger.ContextMenu, 'contextmenu']
        ])

        return showFloatingEventMap.get(trigger)
    })

    const hideFloatingEvent = computed(() => {
        const showFloatingEventMap = new Map<`${Trigger}`, string>([
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

