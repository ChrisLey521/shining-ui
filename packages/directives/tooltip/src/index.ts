import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/vue';
import { createApp, Directive, DirectiveBinding, VueElement } from 'vue';
import { DEFAULT_TOOLTIP_PROPS, tooltipZIndex } from './const';
import Tooltip from './tooltip.vue';
import { isTooltipProps, TooltipBinding, TooltipProps } from './type';
import { isEllipsis } from './utils';

const unmountTooltip = (el: HTMLElement) => {
    console.log(el)
}

const createTooltip = (content: string) => {
    const el = document.createElement('div')
    el.classList.add(
        'sn-tooltip-wrapper',
        'hidden',
        'absolute',
        'w-max',
        tooltipZIndex
    )

    const tooltip = createApp(Tooltip, {
        content
    })
    tooltip.mount(el)
    return el
}

const getContainerEl = (container?: string | HTMLElement) => {
    if (!container) return document.body
    if (typeof container !== 'string') return container
    const el = document.querySelector(container)
    if (!el) throw new Error(`[SN: Tooltip]: Container ${container} not found.`)
    return el
}

const updatePosition = async (el: HTMLElement, tooltip: HTMLElement, binding: TooltipBinding) => {
    const {
        offset: tooltipOffset,
        placement,
        allowedPlacements,
        // showArrow
    } = {
        ...DEFAULT_TOOLTIP_PROPS,
        ...(isTooltipProps(binding.value) ? binding.value : {})
    }

    const { x, y } = await computePosition(el, tooltip, {
        placement,
        middleware: [
            shift(),
            offset(tooltipOffset),
            flip({
                fallbackPlacements: allowedPlacements
            })
        ]
    })
    
    Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`
    })
}

// const onMouseEnter = (tooltip: HTMLElement) => tooltip.classList.contains('hidden')
//     && tooltip.classList.toggle('hidden')

// const onMouseLeave = (tooltip: HTMLElement) => !tooltip.classList.contains('hidden')
//     && tooltip.classList.toggle('hidden')

// const bindEvents = (el: HTMLElement, tooltip: HTMLElement) => {
//     // el.addEventListener('mouseenter', onMouseEnter)
//     // el.addEventListener('mouseleave', onMouseLeave)
// }

const initTooltip = (el: HTMLElement, binding: DirectiveBinding<TooltipProps>) => {
    let content: string
    let container: string | HTMLElement
    if (typeof binding === 'number' || typeof binding === 'string') {
        content = binding
    } else {
        content = binding.value.content
        container = binding.value.container
    }
    
    const containerEl = getContainerEl(container)

    // TODO: 获取el下的所有文本内容
    const tooltip: HTMLElement = createTooltip(content)

    // 添加到body或者指定位置
    containerEl.appendChild(tooltip)
    
    autoUpdate(el, tooltip, () => updatePosition(el, tooltip, binding), {
        animationFrame: true,
    })
}

const mountTooltip = (el: HTMLElement, binding: DirectiveBinding<TooltipProps>) => {
    // 元素的内容是否溢出
    const ellipsis = isEllipsis(el)

    const {
        visible,
        delay = 150,
        showOnEllipses = false
    } = binding.value

    if (!visible || (showOnEllipses && !ellipsis)) return unmountTooltip(el)
    
    return delay
        ? setTimeout(() => initTooltip(el, binding), delay)
        : initTooltip(el, binding)
}

const vTooltip: Directive<VueElement, TooltipProps> = {
    mounted: (el: HTMLElement, binding) => {
        mountTooltip(el, binding)
    },
    updated: (el: HTMLElement) => {
        console.log(isEllipsis(el))
    },
    unmounted: (el: HTMLElement) => {
        console.log(isEllipsis(el))
    },
}

export {
    vTooltip
};
