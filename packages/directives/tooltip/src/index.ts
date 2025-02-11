import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/vue';
import { Theme, Trigger, ZIndex } from 'constants';
import { App, createApp, Directive, DirectiveBinding } from 'vue';
import { DEFAULT_TOOLTIP_PROPS } from './const';
import Tooltip from './tooltip.vue';
import { isTooltipProps, TooltipAction, TooltipContent, TooltipProps } from './type';
import { hideTooltip, isEllipsis, showTooltip, toggleTooltip } from './utils';

// el -> tooltipWrapper
const nodeMap = new WeakMap<HTMLElement, HTMLElement>()
// tooltipWrapper -> tooltipApp
const tooltipMap = new WeakMap<HTMLElement, App<Element>>()
// el -> trigger
const tooltipTriggerMap = new WeakMap<HTMLElement, Trigger>()
// el -> event
const tooltipEventMap = new WeakMap<HTMLElement, Map<TooltipAction, (e: MouseEvent) => void>>()

const unmountTooltip = (el: HTMLElement) => {
    removeEvent(el)
    
    const tooltip = nodeMap.get(el)
    const tooltipApp = tooltipMap.get(tooltip)

    tooltipApp?.unmount?.()
    tooltip?.remove?.()

    nodeMap.delete(el)
    tooltipMap.delete(tooltip)
}

const createTooltip = (el: HTMLElement, tooltipWrapper: HTMLElement, bindingValue: TooltipProps) => {
    let content: TooltipContent
    if (typeof bindingValue === 'number' || typeof bindingValue === 'string') {
        content = bindingValue
    } else {
        content = bindingValue?.content ?? el.textContent
    }

    const {
        contentAsHTML = false,
        contentAsComponent = false,
        theme = Theme.Dark
    } = ['string', 'number', 'boolean', 'undefined'].includes(typeof bindingValue) ? {} : bindingValue as TooltipProps

    const tooltip = createApp(Tooltip, {
        content,
        contentAsHTML,
        contentAsComponent,
        theme,
    })
    tooltip.mount(tooltipWrapper)
    tooltipMap.set(tooltipWrapper, tooltip)

    autoUpdate(el, tooltipWrapper, () => updatePosition(el, tooltipWrapper, bindingValue), {
        animationFrame: true,
    })
}

const getContainerEl = (container?: string | HTMLElement) => {
    if (!container) return document.body
    if (typeof container !== 'string') return container
    const el = document.querySelector(container)
    if (!el) throw new Error(`[SN: Tooltip]: Container ${container} not found.`)
    return el
}

const updatePosition = async (el: HTMLElement, tooltip: HTMLElement, bindingValue: TooltipProps) => {
    const {
        offset: tooltipOffset,
        placement,
        allowedPlacements,
        // showArrow
    } = {
        ...DEFAULT_TOOLTIP_PROPS,
        ...(isTooltipProps(bindingValue) ? bindingValue : {})
    }

    const tooltipWrapper = nodeMap.get(el)
    if (!tooltipWrapper) return


    const arrowEl: HTMLElement = tooltipWrapper.querySelector('#__popper-arrow')
    const { x, y, middlewareData, placement: computedPlacement } = await computePosition(el, tooltip, {
        placement,
        middleware: [
            shift(),
            offset(tooltipOffset),
            flip({
                fallbackPlacements: allowedPlacements
            }),
            arrow({element:arrowEl})
        ]
    })
    
    Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`
    })

    // 箭头位置
    const {x: arrowX, y: arrowY} = middlewareData.arrow;

    const mainPlacement = computedPlacement.split('-')[0]
    const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[mainPlacement];
    
    Object.assign(arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
    });

    // 箭头不需要的边框
    const invisibleArrowBorder = {
        top: ['b-t-transparent', 'b-l-transparent'],
        bottom: ['b-b-transparent', 'b-r-transparent'],
        left: ['b-b-transparent', 'b-l-transparent'],
        right: ['b-t-transparent', 'b-r-transparent'],
    }

    // 隐藏箭头不需要的边框
    arrowEl.classList.remove('b-t-transparent', 'b-b-transparent', 'b-l-transparent', 'b-r-transparent')
    arrowEl.classList.add(...invisibleArrowBorder[mainPlacement])
}

const attachEvent = (
    el: HTMLElement,
    bindingValue: TooltipProps) => {
    
    const tooltip = nodeMap.get(el)
    if (!tooltip) return

    const tooltipActionMap = new Map<TooltipAction, (e?: MouseEvent) => void>()
    tooltipActionMap.set(TooltipAction.Show, () => showTooltip(el, tooltip, bindingValue))
    tooltipActionMap.set(TooltipAction.Hide, () => hideTooltip(el, tooltip, bindingValue))
    tooltipActionMap.set(TooltipAction.Toggle, () => toggleTooltip(el, tooltip, bindingValue))
    tooltipActionMap.set(TooltipAction.ClickOutside, ({ target }) => {
        if (el.contains(target as HTMLElement) || tooltip.contains(target as HTMLElement)) return
        hideTooltip(el, tooltip, bindingValue)
    })
    tooltipActionMap.set(TooltipAction.ContextMenu, (e: MouseEvent) => {
        e.preventDefault()
        toggleTooltip(el, tooltip, bindingValue)
    })

    tooltipEventMap.set(el, tooltipActionMap)

    const trigger = tooltipTriggerMap.get(el)
    // hover触发
    if (trigger === Trigger.Hover) {
        el.addEventListener('mouseenter', tooltipActionMap.get(TooltipAction.Show))
        el.addEventListener('mouseleave', tooltipActionMap.get(TooltipAction.Hide))
        return
    }

    // focus 触发
    if (trigger === Trigger.Focus) {
        el.addEventListener('focus', tooltipActionMap.get(TooltipAction.Show))
        el.addEventListener('blur', tooltipActionMap.get(TooltipAction.Hide))
        return
    }

    // click 触发
    if (trigger === Trigger.Click) {
        el.addEventListener('click', tooltipActionMap.get(TooltipAction.Toggle))
        window.addEventListener('click', tooltipActionMap.get(TooltipAction.ClickOutside))
        return
    }

    // contextmenu触发
    if (trigger === Trigger.ContextMenu) {
        el.addEventListener('contextmenu', tooltipActionMap.get(TooltipAction.ContextMenu))
        window.addEventListener('click', tooltipActionMap.get(TooltipAction.ClickOutside))
    }
}

const removeEvent = (el: HTMLElement) => {
    const trigger = tooltipTriggerMap.get(el)
    const tooltipActionMap = tooltipEventMap.get(el)
    
    const handleShowTooltip = tooltipActionMap.get(TooltipAction.Show)
    const handleHideTooltip = tooltipActionMap.get(TooltipAction.Hide)
    const handleToggleTooltip = tooltipActionMap.get(TooltipAction.Toggle)
    const handleClickOutside = tooltipActionMap.get(TooltipAction.ClickOutside)
    const handleContextMenu = tooltipActionMap.get(TooltipAction.ContextMenu)

    switch (trigger) {
        case Trigger.Hover:
            if (handleShowTooltip) {
                el.removeEventListener('mouseenter', handleShowTooltip)
            }
            if (handleHideTooltip) {
                el.removeEventListener('mouseleave', handleHideTooltip)
            }
            break

        case Trigger.Focus:
            if (handleShowTooltip) {
                el.removeEventListener('focus', handleShowTooltip)
            }
            if (handleHideTooltip) {
                el.removeEventListener('blur', handleHideTooltip)
            }
            break
        
        case Trigger.Click:
            el.removeEventListener('click', handleToggleTooltip)
            window.removeEventListener('click', handleClickOutside)

            break

        case Trigger.ContextMenu:
            el.removeEventListener('contextmenu', handleContextMenu)
            window.removeEventListener('click', handleClickOutside)
            break

        default:
            return
    }

    tooltipEventMap.delete(el)
}

const initTooltip = (el: HTMLElement, binding: DirectiveBinding<TooltipProps>) => {
    const tooltipWrapper: HTMLElement = document.createElement('div')
    nodeMap.set(el, tooltipWrapper)
    tooltipTriggerMap.set(el, binding.value?.trigger ?? Trigger.Hover)

    tooltipWrapper.classList.add(
        'sn-tooltip-wrapper',
        'absolute',
        'w-max',
        ZIndex.Tooltip
    )

    if (!binding.value?.visible) {
        tooltipWrapper.classList.add('hidden')
    }

    // TODO: 获取el下的所有文本内容
    createTooltip(el, tooltipWrapper, binding.value)

    const containerEl = getContainerEl(binding.value?.container ?? document.body)
    // 添加到body或者指定位置
    containerEl.appendChild(tooltipWrapper)
    
    attachEvent(el, { showOnEllipses: binding.value?.showOnEllipses })
}

const mountTooltip = (el: HTMLElement, binding: DirectiveBinding<TooltipProps>) => {
    // 元素的内容是否溢出
    const ellipsis = isEllipsis(el)

    const {
        visible = true,
        showOnEllipses = false
    } = typeof binding.value === 'object' ? binding.value : {}

    if (!visible || (showOnEllipses && !ellipsis)) return unmountTooltip(el)
    
    return initTooltip(el, binding)
}

const vTooltip: Directive<HTMLElement, TooltipProps> = {
    mounted: (el, binding) => {
        mountTooltip(el, binding)
    },
    updated: (el, binding) => {
        if (binding.value === binding.oldValue) return
        const tooltip = nodeMap.get(el)
        const tooltipApp = tooltipMap.get(tooltip)

        tooltipApp?.unmount?.()

        tooltipMap.delete(tooltip)

        const tooltipWrapper = nodeMap.get(el)
        createTooltip(el, tooltipWrapper, binding.value)
    },
    unmounted: (el) => {
        unmoutToooltip(el)
    },
}

export {
    vTooltip
};
