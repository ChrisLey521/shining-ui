import { TooltipProps } from './type'

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

const tooltip = {
  el: null as HTMLElement | null,
  setTooltip: (el: HTMLElement): void => {
    tooltip.el = el
  },
  getTooltip: () => tooltip.el,
  clearTooltip: (): void => tooltip.el = null
}

const showTooltip = (el: HTMLElement, tooltip: HTMLElement, { showOnEllipses, visible }: TooltipProps) => {
  if (!tooltip) return
  if ((showOnEllipses && !isEllipsis(el)) || typeof visible !== 'undefined') return
  if (!tooltip.classList.contains('hidden')) return
  tooltip.classList.remove('hidden')
}

const hideTooltip = (el: HTMLElement, tooltip: HTMLElement, { showOnEllipses, visible }: TooltipProps) => {
  if (!tooltip) return
  if ((showOnEllipses && !isEllipsis(el)) || typeof visible !== 'undefined') return
  if (tooltip.classList.contains('hidden')) return
  tooltip.classList.add('hidden')
}

const toggleTooltip = (el: HTMLElement, tooltip: HTMLElement, { showOnEllipses, visible }: TooltipProps) => {
  if (!tooltip) return
  if ((showOnEllipses && !isEllipsis(el)) || typeof visible !== 'undefined') return
  tooltip.classList.toggle('hidden')
}

export {
  hideTooltip, isEllipsis, showTooltip, toggleTooltip, tooltip
}

