import { TooltipProps } from 'constants/floating';
import { App, createApp, Directive, DirectiveBinding } from 'vue';
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
    
    const div = document.createElement('div')
    // render(tooltip, div)
    const tooltipApp = createApp(Tooltip, {
        ...props,
        referenceElement: el
    })
    tooltipApp.mount(div)
    div.remove()
    
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
    beforeUnmount: (el) => {
        unmountTooltip(el)
    },
}

export {
    vTooltip
};

