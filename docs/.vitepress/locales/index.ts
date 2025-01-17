import en from './en/lang.json'
import zh from './zh/lang.json'

// import { readYamlAsJson } from 'utils'
// const zh = readYamlAsJson('./zh/lang.yaml')
// const en = readYamlAsJson('./en/lang.yaml')

type LangConfig = Record<string, string>

const langMap = new Map<string, LangConfig>([
    ['zh', zh],
    ['en', en]
])

const translate = (key: string, locale: string) => langMap.get(locale)?.[key] ?? key

const getLink = (path: string, locale: string) => locale === 'zh'
    ? path
    : `/${locale}${path}/`

const generateSidebarConfig = (locale: string) => ({
  [getLink('/guide', locale)]: [
    { text: translate('Guide', locale), link: getLink('/guide', locale)}
  ],
  [getLink('/components', locale)]: [
    { text: translate('Components', locale), link: getLink('/components', locale) },
    { text: translate('Button', locale), link: '/components/button' }
  ],
  [getLink('/examples', locale)]: [
    { text: translate('Markdown Examples', locale), link: getLink('/markdown-examples', locale) },
    { text: translate('Runtime API Examples', locale), link: getLink('/api-examples', locale) }
  ],
})

export {
    generateSidebarConfig
}
