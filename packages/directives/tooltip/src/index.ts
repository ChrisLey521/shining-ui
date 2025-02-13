import { TooltipProps } from 'constants/floating';
import { Directive, DirectiveBinding, h, render, VNode } from 'vue';
import Tooltip from './tooltip.vue';
import { normalizeProps } from './utils';

// el -> tooltipWrapper
const nodeMap = new WeakMap<HTMLElement, VNode>()

const unmountTooltip = (el: HTMLElement) => {
    // const tooltip = nodeMap.get(el)
    // tooltip?.component?.exposed?.destroy?.()
    nodeMap.delete(el)
}

const initTooltip = (el: HTMLElement, { value }: DirectiveBinding<TooltipProps>) => {
    const props = normalizeProps(el, value)
    
    const tooltip = h(Tooltip, {
        ...props,
        container: void 0,
        referenceElement: el
    })

    const div = document.createElement('div')
    render(tooltip, div)
    const { firstChild } = div
    document.body.appendChild(firstChild)
    
    nodeMap.set(el, tooltip)
}

const vTooltip: Directive<HTMLElement, TooltipProps> = {
    mounted: (el, binding) => {
        return initTooltip(el, binding)
    },
    updated: (el, binding) => {
        if (binding.value === binding.oldValue) return

        initTooltip(el, binding)
    },
    unmounted: (el) => {
        unmountTooltip(el)
    },
}

export {
    vTooltip
};
