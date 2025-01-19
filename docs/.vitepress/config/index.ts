// import 'virtual:unocss';
import { defineConfig, UserConfig } from 'vitepress';
import { DEFAULT_LOCALE } from '../locales';
import { localesConfig } from './locales';
import { generateNavConfig } from './nav';
import { generateSidebarConfig } from './sidebar';
import { viteConfig } from './vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shining UI",
  description: "A UI lib for Vue3.5+",
  cleanUrls: true,
  vite: viteConfig,
  vue: {},
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: generateNavConfig(DEFAULT_LOCALE),

    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '',
    //     apiKey: '',
    //     indexName: ''
    //   }
    // },
    search: {
      provider: 'local'
    },

    sidebar: generateSidebarConfig(DEFAULT_LOCALE),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ChrisLey521/shining-ui' }
    ],
  },

  rewrites(id) {

    const replacingRegExp = new RegExp(`^(pages\\/${DEFAULT_LOCALE}\\/|pages\\/).*`)
    const routePath = id.replace(replacingRegExp, (path, group: string) => path.slice(group?.length ?? 0))
    console.log(routePath)
    return routePath
  },
  locales: localesConfig,
}) satisfies UserConfig