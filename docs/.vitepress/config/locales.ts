import { DEFAULT_LOCALE, Locale } from '../locales'
import { generateNavConfig } from './nav'
import { generateSidebarConfig } from './sidebar'

const localesConfig = {
  root: {
    label: '中文',
    lang: DEFAULT_LOCALE,
  },
  en: {
    label: 'English',
    lang: Locale.En,
    themeConfig: {
      nav: generateNavConfig(Locale.En),
      
      sidebar: generateSidebarConfig(Locale.En),
    }
  }
}

export {
    localesConfig
}
