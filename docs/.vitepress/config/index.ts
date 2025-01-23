// import 'virtual:unocss';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs';
import { defineConfig, UserConfig } from 'vitepress';
import { DEFAULT_LOCALE } from '../locales';
import { localesConfig } from './locales';
import { mdPlugin } from './plugins';
import { themeConfig } from './theme';
import { viteConfig } from './vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shining UI",
  description: "A UI lib for Vue3.5+",
  cleanUrls: true,
  vite: viteConfig,
  vue: {},
  markdown: {
    config: (md) => mdPlugin(md),
    codeTransformers: [
      transformerTwoslash({
        typesCache: createFileSystemTypesCache()
      })
    ]
  },
  themeConfig,

  rewrites(id) {

    const replacingRegExp = new RegExp(`^(pages\\/${DEFAULT_LOCALE}\\/|pages\\/).*`)
    const routePath = id.replace(replacingRegExp, (path, group: string) => path.slice(group?.length ?? 0))
    return routePath
  },
  locales: localesConfig,
}) satisfies UserConfig