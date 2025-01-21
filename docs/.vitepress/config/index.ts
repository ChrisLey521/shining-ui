// import 'virtual:unocss';
import { defineConfig, UserConfig } from 'vitepress';
import { DEFAULT_LOCALE } from '../locales';
import { localesConfig } from './locales';
import { generateNavConfig, navConfig } from './nav';
import { generateSidebarConfig, sidebarConfig } from './sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shining UI",
  description: "A UI lib for Vue3.5+",
  cleanUrls: true,
  vite: {
    resolve: {
      extensions: ['.vue', '.ts', '.js'],
      alias: {
        '@common': '/.vitepress/vitepress/common',
        '@demos': '/.vitepress/vitepress/demos'
      }
    }
  },
  vue: {},
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: generateNavConfig(navConfig, DEFAULT_LOCALE),

    search: {
      provider: 'local'
    },

    sidebar: generateSidebarConfig(sidebarConfig, DEFAULT_LOCALE),

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