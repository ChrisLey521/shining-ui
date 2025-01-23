# Component Doc Demo

## 一、创建组件文档

在 `docs/pages/:locale`目录下创建对应 `component.md`，这里的`locale`指的是`docs/pages`下的各个语言目录。对于每个组件`component`，现阶段每个目录下都需要创建一份`component.md`，以便在切换到不同的语言时显示对应的文档。创建好`[组件名].md`文件后，会自动生成路由`/components/[组件名]`，改动浏览器`url`即可访问。

## 二、配置头部和侧边导航

在对应的配置文件下，添加需要的导航配置。成功添加后将会在头部和侧边栏出现对应的导航菜单。

::: code-group

```ts [docs/.vitepress/config/nav.ts]
const navConfig: NavConfig = [
  {
    text: 'Home',
    link: '/'
  },
  {
    text: 'Guide',
    link: '/guide'
  },
  {
    text: 'Components',
    link: '/components'
  },
  {
    text: 'Examples',
    link: '/examples'
  },
  // 添加你需要的头部导航
]

export {
    navConfig
}
```

```ts [docs/.vitepress/config/sidebar.ts]
const sidebarConfig: SidebarConfig = {
  '/guide': [
    {
      text: 'Guide',
      link: ''
    }
  ],
  '/components': [
    {
      text: 'Button',
      link: '/button',
      // children: []
    }
  ],
  '/examples': [
    {
      text: 'Doc Examples',
      link: '/doc-examples'
    },
    {
      text: 'Markdown Examples',
      link: '/markdown-examples'
    },
    {
      text: 'Runtime API Examples',
      link: '/api-examples'
    }
  ]
}

export {
    sidebarConfig
}
```

:::

## 三、导航菜单的多语言支持

在`docs/.vitepress/locales/[lcoale]/lang.json`中添加对应的翻译内容。成功添加后，切换到对应的语言时，头部和侧边栏的文字将会被翻译为添加的内容。

:::code-group

```json [docs/.vitepress/locales/zh/lang.json]
{
    "Home": "首页",
    "Guide": "指南",
    "Components": "组件",
    "Examples": "示例",
    "Button": "按钮",
    "Doc Examples": "文档编写示例",
    "Markdown Examples": "马克党实力",
    "Runtime API Examples": "跑起来, API!"
}
```

:::

## 四、编写组件demo

所有的组件`demo`都应位于`docs/.vitepress/vitepress/demos`目录下，**每个组件拥的`demo`目录名称必须和文档名一致。例如`Button`文档的文件名为`button.md`，则`Button`组件的`demo`目录名也必须是`button`，即`docs/.vitepress/vitepress/demos/button`**。
`demo`目录下存放着该组件各个用法示例的`vue`文件。例如`Button`的`demo`目录在`docs/.vitepress/vitepress/demos/button`，其基础用法示例文件为`docs/.vitepress/vitepress/demos/button/basic.vue`。我们只需要在`basic.vue`中编写示例即可。
::: code-group

```js-vue [docs/.vitepress/vitepress/demos/button/basic.vue]
<template>
    <div class="
        grid
        grid-cols-5
        gap-2
    ">
        <sn-button>默认按钮</sn-button>
        <sn-button variant="primary">主要按钮</sn-button>
        <sn-button variant="success">成功按钮</sn-button>
        <sn-button variant="warning">警告按钮</sn-button>
        <sn-button variant="danger">危险按钮</sn-button>
    </div>
</template>
```

:::

## 五、在组件文档中展示示例

下面以中文的`Button`按钮文档为例，该文档应位于`docs/pages/zh/button.md`。

只需要在`:::demo`和`:::`之间加入`[组件名]/[组件示例的vue文件名]`即可展示示例。注意，组件示例的vue文件必须已经编写好，且位于正确的组件`demo`目录下。例如要展示`Button`的基础用法，则`[组件名]`为`button`，`[组件示例的vue文件名]`为`basic`。

::: code-group

```md [docs/pages/zh/button.md]

# 一级标题：组件名
组件简介

## 二级标题：组件的各个用法
组件用法简介

:::demo

button/basic

:::(demo end，这个括号及括号里的内容不要写！！！)

```

:::

将会得到如下效果：

:::demo

doc-examples/basic

:::

## 六、API 列表

此部分内容仍在建设中，敬请期待

恭喜你轻轻松松掌握了文档的编写方式:100:，下面就开始开发组件吧:tada: