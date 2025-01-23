import { UserConfig } from 'vitepress';
import { DEFAULT_LOCALE } from '../locales';
import { generateNavConfig, navConfig } from './nav';
import { generateSidebarConfig, sidebarConfig } from './sidebar';

export const themeConfig: UserConfig['themeConfig'] = {
    logo: '/images/Willow.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: generateNavConfig(navConfig, DEFAULT_LOCALE),

    search: {
        provider: 'local'
    },

    sidebar: generateSidebarConfig(sidebarConfig, DEFAULT_LOCALE),

    socialLinks: [
        { icon: 'github', link: 'https://github.com/ChrisLey521/shining-ui' }
    ],
}