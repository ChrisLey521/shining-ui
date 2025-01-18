import { getLink, Locale, t } from '../locales'

const generateSidebarConfig = (locale: Locale) => ({
  [getLink('/guide', locale)]: [
    { text: t('Guide', locale), link: getLink('/guide', locale)}
  ],
  [getLink('/components', locale)]: [
    { text: t('Components', locale), link: getLink('/components', locale) },
    { text: t('Button', locale), link: getLink('/components/button', locale) }
  ],
  [getLink('/examples', locale)]: [
    { text: t('Doc Examples', locale), link: getLink('/examples/doc-examples', locale) },
    { text: t('Markdown Examples', locale), link: getLink('/examples/markdown-examples', locale) },
    { text: t('Runtime API Examples', locale), link: getLink('/examples/api-examples', locale) }
  ],
})

export {
    generateSidebarConfig
}
