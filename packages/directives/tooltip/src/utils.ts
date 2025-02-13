import { DEFAULT_TOOLTIP_PROPS, TooltipProps } from 'constants/floating'
import { isObject } from 'lodash-unified'

// 文本等是否溢出, 用于只在溢出时显示tooltip
const isEllipsis = (el: HTMLElement) => {
    if (el.scrollWidth > el.offsetWidth) return true

    const range = document.createRange()
    range.setStart(el, 0)
    range.setEnd(el, el.childNodes.length)
    const rangeWidth = range.getBoundingClientRect().width
    const padding =
        (Number.parseInt(getComputedStyle(el)['paddingLeft'], 10) || 0) +
        (Number.parseInt(getComputedStyle(el)['paddingRight'], 10) || 0)

    return rangeWidth + padding > el.offsetWidth
}

const normalizeProps = (el: HTMLElement, options?: TooltipProps | string | number): TooltipProps & {
  referenceElement?: HTMLElement
} => {
  const content = typeof options === 'string' || typeof options === 'number'
    ? options
    : (options?.content ?? el.textContent)

  return {
    ...DEFAULT_TOOLTIP_PROPS,
    ...(isObject(options) ? options : {}),
    content,
    referenceElement: el,
  }
}

export {
  isEllipsis, normalizeProps
}

