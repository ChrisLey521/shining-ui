import { DEFAULT_LOCALE, Locale } from '../locales'
import { generateNavConfig, navConfig } from './nav'
import { generateSidebarConfig, sidebarConfig } from './sidebar'

const localesConfig = {
  root: {
    label: '中文',
    lang: DEFAULT_LOCALE,
  },
  en: {
    label: 'English',
    lang: Locale.En,
    themeConfig: {
      nav: generateNavConfig(navConfig, Locale.En),
      
      sidebar: generateSidebarConfig(sidebarConfig, Locale.En),
    }
  }
}

export {
  localesConfig
}

