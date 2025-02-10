# 组件文档示例

## 一、创建组件文档

在 `docs/pages/:locale`目录下创建对应 `component.md`，这里的`locale`指的是`docs/pages`下的各个语言目录。对于每个组件`component`，现阶段每个目录下都需要创建一份`component.md`，以便在切换到不同的语言时显示对应的文档。

下面以中文的`Button`按钮文档为例，由于默认语言为中文，因此在默认语言下的该文档位于`docs/pages/zh/button.md`。

::: code-group

```md [docs/pages/zh/button.md]
# Button 按钮

## 基础用法

这里介绍基础用法...

## 其它用法 ...
```

:::

此时进入到对应路由`/components/button`就能看到对应内容。如果文档当前的语言不是默认语言，则路由为`/:lcoale/components/button`

## 二、配置导航菜单

尽管这时候相应路由的页面已经有了编写的内容，但是没有头部和侧边导航菜单中没有入口，需要手动配置一下。一般情况下无需配置头部导航，因为组件的文档都在头部导航**组件**下，因此大部分情况下只需要配置侧边导航`sidebarConfig`即可。

按照如下方式配置`Button`组件：

::: code-group

```ts [docs/.vitepress/config/sidebar.ts]
const sidebarConfig: SidebarConfig = {
  '/components': [
    // 其它组件配置 ...

    { // [!code ++]
      text: 'Button', // [!code ++]
      link: '/button' // [!code ++]
    } // [!code ++]
  ],
}
```

:::

## 三、菜单的多语言支持

语言配置文件在`docs/.vitepress/locales/`目录下。

## 四、编写组件demo

所有的组件demo都应位于`docs/.vitepress/vitepress/demos`目录下，每个组件拥有以组件名称的**小写字母**命名的目录，目录下存放着该组件各个用法示例的`vue`文件。例如`Button`的`demo`目录在`docs/.vitepress/vitepress/demos/button`，其基础用法示例文件为`docs/.vitepress/vitepress/demos/button/basic.vue`。我们只需要在`basic.vue`中编写示例即可。
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

使用常规的`md`表格即可。