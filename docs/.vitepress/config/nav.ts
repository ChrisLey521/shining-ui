import { getActiveMatch, getLink, Locale, t } from '../locales'

const generateNavConfig = (locale: Locale) => {
  return [
    { text: t('Home', locale), link: getLink('/', locale), activeMatch: getActiveMatch('/', locale)  },
    { text: t('Guide', locale), link: getLink('/guide', locale), activeMatch: getActiveMatch('/guide', locale) },
    { text: t('Components', locale), link: getLink('/components', locale), activeMatch: getActiveMatch('/components', locale) },
    { text: t('Examples', locale), link: getLink('/examples', locale), activeMatch: getActiveMatch('/examples', locale) }
  ]
}

export {
    generateNavConfig
}
