import { UserConfig } from 'vitepress';
import { DEFAULT_LOCALE } from '../locales';
import { generateNavConfig, navConfig } from './nav';
import { generateSidebarConfig, sidebarConfig } from './sidebar';

export const themeConfig: UserConfig['themeConfig'] = {
    
    // https://vitepress.dev/reference/default-theme-config
    nav: generateNavConfig(navConfig, DEFAULT_LOCALE),

    search: {
        provider: 'local'
    },

    logo: '/images/logo.png',

    sidebar: generateSidebarConfig(sidebarConfig, DEFAULT_LOCALE),

    socialLinks: [
        { icon: 'github', link: 'https://github.com/ChrisLey521/shining-ui' }
    ],
}