import { isObject, isString, trim } from 'lodash-unified'
import { CSSProperties } from 'vue'
import { assert } from './assert'

const attachEvent = (
    dom: HTMLElement | Window | Document,
    eventName: string,
    handler: (e?: Event) => void
) => {
    assert(!!dom, `\`attachEvent\` requires a dom target but got ${ typeof dom }`)
    dom?.addEventListener?.(eventName, handler)
}

const removeEvent = (
    dom: HTMLElement | Window | Document,
    eventName: string,
    handler: (e?: Event) => void
) => {
    assert(!!dom, `\`removeEvent\` requires a dom target but got ${ typeof dom }`)
    dom?.removeEventListener?.(eventName, handler)
}

const objectifyStyle = (style?: string | CSSProperties) => {
    if (isString(style)) {
        const isInvalidStyleString = style.includes('{')
        if (isInvalidStyleString) {
            assert(!isInvalidStyleString, `Invalid style ${style}`)
            return {}
        }
        const styles = style.split(/(;|,)/).map(item => item.split(':').map(str => trim(str, ' ')))
        return Object.fromEntries(styles)
    }
    if (isObject(style) && !!style) return style
    return {}
}

export {
    attachEvent, objectifyStyle, removeEvent
}

