import { Directive } from 'vue'

const nodeList = new WeakMap<HTMLElement, ((e?: MouseEvent) => void)[]>()
const flushList = new WeakMap<HTMLElement, (e: MouseEvent) => void>()

const vClickOutside: Directive<HTMLElement> = {
    mounted(el, binding) {
        if (typeof binding.value !== 'function') return
        const handlers = nodeList.get(el) ?? []
        handlers.push(binding.value)
        nodeList.set(el, handlers)

        const flushHandler = (e: MouseEvent) => {
            if (el.contains(e.target as HTMLElement)) return
            (nodeList.get(el) ?? []).forEach(cb => cb(e))
        }
        flushList.set(el, flushHandler)
        window.addEventListener('click', flushHandler)
    },
    updated(el, { value, oldValue }) {
        if (value === oldValue) return
        const handlers = (nodeList.get(el) ?? []).filter(handler => handler !== oldValue)
        handlers.push(value)
    },
    unmounted(el) {
        const flushHandler = flushList.get(el)
        window.removeEventListener('click', flushHandler)
        nodeList.delete(el)
        flushList.delete(el)
    }
}

export {
    vClickOutside
}
