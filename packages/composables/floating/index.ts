import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';
import { Trigger } from 'constants/common';
import { POPPER_SIDE } from 'constants/popper';
import { computed, ref } from 'vue';
import { FloatingEventsOptions, FloatingVueOptions, PlacementSide } from './type';

const useFloatingVue = ({
    placement,
    offset: popperOffset = 10,
}: FloatingVueOptions) => {
    const reference = ref(null);
    const floating = ref(null);
    const floatingArrow = ref(null)

    const middleware = [offset(popperOffset), flip(), shift(), arrow({ element: floatingArrow })]

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
    floating,
    reference,
    trigger = Trigger.Hover,
    disabled,
    modelVisible,
    controlledVisible
}: FloatingEventsOptions) => {
    
    const visible = ref(modelVisible?.value ?? controlledVisible)

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

    const toggleFloating = (shouldShowFloating: boolean) => {
        if (disabled) return
        // 优先级策略: v-model:visible > controlledVisible (受控) > visible

        // 没有 v-model:visible
        if (typeof modelVisible?.value === 'undefined') {
            // 传入了 props.visible , 则由 props.visible 决定，组件不能更改可见性
            if (typeof controlledVisible !== 'undefined') return
            // 没有传入 props.visible 则由组件自己决定
            visible.value = shouldShowFloating
            return
        }
        // 有 v-model:visible, 组件可更改可见性, 且v-model:visible也同样会更新值
        visible.value = shouldShowFloating
        // v-model值变更时, 会自动 emits update:visible ?
        modelVisible.value = shouldShowFloating
    }

    const showFloating = (e: MouseEvent) => {
        e.preventDefault()
        toggleFloating(true)
    }

    const hideFloating = () => {
        toggleFloating(false)
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (!e?.target) return
        if (floating?.value?.contains?.(e.target as HTMLElement) || reference?.value?.contains?.(e.target as HTMLElement)) return
        if (trigger !== Trigger.Click && trigger !== Trigger.ContextMenu) return
        toggleFloating(false)
    }

    const handleReferenceClick = () => {
        if (trigger !== Trigger.Click) return
        const shouldShowFloating = !visible.value
        toggleFloating(shouldShowFloating)
    }

    return {
        /** popper实际的可见性 */
        visible,
        /** 用于 @[event]="showFloating" 动态事件绑定 */
        showFloatingEvent,
        hideFloatingEvent,
        showFloating,
        hideFloating,
        handleClickOutside,
        handleReferenceClick,
    }
}

export {
    useFloatingEvents, useFloatingVue
};
