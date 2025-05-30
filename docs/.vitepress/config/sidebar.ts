import { getLink, Locale, t } from '../locales'

import { DefaultTheme } from 'vitepress'

type SidebarConfig = Record<string, DefaultTheme.SidebarItem[]>

const sidebarConfig: SidebarConfig = {
  '/guide': [
    {
      text: 'Guide',
      link: ''
    }
  ],
  '/components': [
    {
      text: 'Icon',
      link: 'icon',
    },
    {
      text: 'Button',
      link: 'button',
      // children: []
    },
    {
      text: 'Overlay',
      link: 'overlay',
    },
    {
      text: 'Tooltip',
      link: 'tooltip',
    },
    {
      text: 'Dropdown',
      link: 'dropdown',
    },
    {
      text: 'Tag',
      link: 'tag',
    },
    {
      text: 'Input',
      link: 'input'
    },
    {
      text: 'InputNumber',
      link: 'input-number'
    },
    {
      text: 'InputTag',
      link: 'input-tag'
    },
    {
      text: 'Textarea',
      link: 'textarea'
    },
    {
      text: 'Radio',
      link: 'radio'
    },
    {
      text: 'Checkbox',
      link: 'checkbox'
    },
    {
      text: 'Select',
      link: 'select'
    }
  ],
  '/examples': [
    {
      text: 'Doc Examples',
      link: 'doc-examples'
    },
    {
      text: 'Markdown Examples',
      link: 'markdown-examples'
    },
    {
      text: 'Runtime API Examples',
      link: 'api-examples'
    },
    {
      text: '3D Earth',
      link: 'earth-3d'
    }
  ]
}

const generateSidebarConfig = (sidebarConfig: SidebarConfig, locale: Locale) => [...Object.entries(sidebarConfig)]
  .reduce((res, [base, children]) => {
    res[getLink(base, locale)] = children.map(({ text, link }) => ({
      text: t(text!, locale),
      link: getLink(`${base}/${link ?? ''}`, locale)
    }))
    return res
  }, {})

export {
  generateSidebarConfig,
  sidebarConfig
}

