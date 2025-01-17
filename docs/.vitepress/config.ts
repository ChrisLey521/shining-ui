import json from '@rollup/plugin-json';
import { defineConfig } from 'vitepress';
import { generateSidebarConfig } from './locales';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shining UI",
  description: "A UI lib for Vue3.5+",
  cleanUrls: true,
  vite: {
    plugins: [
      json({
        // 假设你的YAML文件有JSON类型的数据
        // 如果不是，你可能需要一个特定的插件来处理YAML
        include: '**/*.yaml',
      })
    ],
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

    sidebar: generateSidebarConfig('zh'),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },

  rewrites(id) {
    const replacingRegExp = /^(pages\/zh\/|pages\/).*/
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
        
        sidebar: generateSidebarConfig('en'),
      }
    }
  }
})
