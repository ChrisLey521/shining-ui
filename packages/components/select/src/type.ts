
type BasicValue = string | number | boolean
type SelectValue = BasicValue | BasicValue[]

const isBasicValue = (val: SelectValue): val is BasicValue => !Array.isArray(val)

interface SelectEvents {
    (e: 'change', value: SelectValue, oldValue: SelectValue): void
    (e: 'select', currentValue: SelectValue, allSelectedValues?: BasicValue[]): void
    (e: 'select-all'): void
    (e: 'remove', value: BasicValue): void
    (e: 'clear'): void
}

interface SelectContext {
    select: { $el: HTMLElement }
    value: SelectValue
    multiple: boolean
}

export {
    BasicValue, isBasicValue, SelectContext, SelectEvents, SelectValue
}

