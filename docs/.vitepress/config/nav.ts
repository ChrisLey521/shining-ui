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

export {
  generateNavConfig,
  navConfig
}

