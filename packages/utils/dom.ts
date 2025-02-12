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

export {
    attachEvent,
    removeEvent
}

