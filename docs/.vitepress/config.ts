import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shining UI",
  description: "A UI lib for Vue3.5+",
  cleanUrls: true,
  vite: {
    resolve: {
      extensions: ['.vue', '.ts', '.js']
    }
  },
  vue: {},
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/', activeMatch: '^/$' },
      { text: '指南', link: '/guide', activeMatch: '/guide/' },
      { text: '组件', link: '/components', activeMatch: '/components/' },
      { text: '示例', link: '/examples', activeMatch: '/examples/' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Guide', link: '/guide' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Components', link: '/components' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },

  rewrites(id) {
    const replacingRegExp = /^(locales\/zh\/|locales\/).*/
    const routePath = id.replace(replacingRegExp, (path, group: string) => path.slice(group?.length ?? 0))
    console.log(routePath)
    return routePath
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en', activeMatch: '^/en/$'  },
          { text: 'Guide', link: '/en/guide', activeMatch: '/en/guide'  },
          { text: 'Components', link: '/en/components', activeMatch: '/en/components'  },
          { text: 'Examples', link: '/en/examples', activeMatch: '/en/examples'  }
        ],
      }
    }
  }
})
