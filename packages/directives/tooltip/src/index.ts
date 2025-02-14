import { TooltipProps } from 'constants/floating';
import { App, createApp, Directive, DirectiveBinding, h } from 'vue';
import Tooltip from './tooltip.vue';
import { normalizeProps } from './utils';

// el -> tooltipWrapper
const nodeMap = new WeakMap<HTMLElement, App>()

const unmountTooltip = (el: HTMLElement) => {
    const tooltipApp = nodeMap.get(el)
    tooltipApp.unmount()
    // nodeMap.delete(el) // WeakMap自动清理
}

const initTooltip = (el: HTMLElement, { value }: DirectiveBinding<TooltipProps>) => {
    const props = normalizeProps(el, value)
    
    const tooltip = h(Tooltip, {
        ...props,
        container: void 0,
        referenceElement: el
    })

    const div = document.createElement('div')
    // render(tooltip, div)
    const tooltipApp = createApp(tooltip)
    tooltipApp.mount(div)
    const { firstChild } = div
    document.body.appendChild(firstChild)
    
    nodeMap.set(el, tooltipApp)
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

