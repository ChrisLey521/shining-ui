import { isNil } from 'lodash-unified'

export {
    isArray, isDate, isFunction,
    isObject, isPlainObject, isPromise, isString, isSymbol
    // eslint-disable-next-line vue/prefer-import-from-vue
} from '@vue/shared'

export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const isEmpty = (val: unknown) =>
    (!val && val !== 0) ||
    (isArray(val) && val.length === 0) ||
    (isObject(val) && !Object.keys(val).length)

export const isElement = (e: unknown): e is Element => {
    if (typeof Element === 'undefined') return false
    return e instanceof Element
}

export const isPropAbsent = (prop: unknown): prop is null | undefined =>
    isNil(prop)

export const isStringNumber = (val: string): boolean => {
    if (!isString(val)) {
        return false
    }
    return !Number.isNaN(Number(val))
}

export const isWindow = (val: unknown): val is Window => val === window