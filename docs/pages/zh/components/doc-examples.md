# Component Doc Demo 组件文档示例

## 一、创建组件文档
在 `docs/pages/:locale`目录下创建对应 `component.md`，这里的`locale`指的是`docs/pages`下的各个语言目录。对于每个组件`component`，现阶段每个目录下都需要创建一份`component.md`，以便在切换到不同的语言时显示对应的文档。

下面以中文的`Button`按钮文档为例，该文档应位于`docs/pages/zh/button.md`。

## 二、编写组件demo
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

## 三、在组件文档中展示示例
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

button/basic

:::