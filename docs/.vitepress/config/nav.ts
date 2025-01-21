import { getActiveMatch, getLink, Locale, t } from '../locales'

type NavConfig = Record<'text' | 'link', string>[]

const navConfig: NavConfig = [
  {
    text: 'Home',
    link: '/'
  },
  {
    text: 'Guide',
    link: '/guide'
  },
  {
    text: 'Components',
    link: '/components'
  },
  {
    text: 'Examples',
    link: '/examples'
  },
]

const generateNavConfig = (config: NavConfig, locale: Locale) => config.map(({ text, link }) => ({
  text: t(text, locale),
  link: getLink(link, locale),
  activeMatch: getActiveMatch(link, locale)
}))

// const generateNavConfig1 = (locale: Locale) => {
//   return [
//     { text: t('Home', locale), link: getLink('/', locale), activeMatch: getActiveMatch('/', locale)  },
//     { text: t('Guide', locale), link: getLink('/guide', locale), activeMatch: getActiveMatch('/guide', locale) },
//     { text: t('Components', locale), link: getLink('/components', locale), activeMatch: getActiveMatch('/components', locale) },
//     { text: t('Examples', locale), link: getLink('/examples', locale), activeMatch: getActiveMatch('/examples', locale) }
//   ]
// }

export {
  generateNavConfig,
  navConfig
}

