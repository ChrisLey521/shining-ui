import { docRoot } from '@shining-ui/build-constants'
import { readdirSync } from 'fs'
import { relative, resolve, sep } from 'path'
import en from './en/lang.json'
import zh from './zh/lang.json'

// import { readYamlAsJson } from 'utils'
// const zh = readYamlAsJson('./zh/lang.yaml')
// const en = readYamlAsJson('./en/lang.yaml')

enum Locale {
  Zh = 'zh',
  En = 'en'
}
const DEFAULT_LOCALE = Locale.Zh

type LangConfig = Record<string, string>

const langMap = new Map<Locale, LangConfig>([
    [Locale.Zh, zh],
    [Locale.En, en]
])

const translate = (key: string, locale: Locale) => langMap.get(locale)?.[key] ?? key

const getLink = (path: string, locale: Locale) => locale === DEFAULT_LOCALE
    ? path
    : `/${locale}${path}/`

const getActiveMatch = (match: string, locale: Locale) => {
  const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  return match === '/' ? `^${localePrefix}/$` : `${localePrefix}${match}`
}

const languages = readdirSync(resolve(docRoot, '.vitepress/locales'))

const getLang = (id: string) => relative(docRoot, id).split(sep)[0]

export {
  DEFAULT_LOCALE, getActiveMatch, getLang, getLink, languages, Locale, translate as t, zh
}

