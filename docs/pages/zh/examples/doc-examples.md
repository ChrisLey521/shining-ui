<!-- 给文档起个标题（本文档以 Button 按钮 作为示例组件） -->
# XXX 组件

<!-- 二级标题 -->
## 基础用法
<!-- 内容的概要 -->
通过`variant`, `round`, `circle`, `plain`等来参数定义不同的样式，

<!-- 通过卡片来展示组件的实际效果以及代码, 本卡片内置grid布局, 传入 columns 参数控制组件展示时的列的数量, 默认 1 列 -->
<exhibition-card :columns="5">
<!-- 这里需要空一格， 否则无法展示出代码块的样式 -->

<!-- 接下来是代码示例, 这里用markdown格式，语言为js-vue -->
```js-vue
<template>
    <sn-button>默认按钮</sn-button>
    <sn-button variant="primary">主要按钮</sn-button>
    <sn-button variant="success">成功按钮</sn-button>
    <sn-button variant="warning">警告按钮</sn-button>
    <sn-button variant="danger">危险按钮</sn-button>
</template>
```
<!-- 这里使用插槽 #exhibition 来展示组件的效果 -->
<template #exhibition>
    <sn-button>默认按钮</sn-button>
    <sn-button variant="primary">主要按钮</sn-button>
    <sn-button variant="success">成功按钮</sn-button>
    <sn-button variant="warning">警告按钮</sn-button>
    <sn-button variant="danger">危险按钮</sn-button>
    <sn-button>默认按钮</sn-button>
    <sn-button variant="primary">主要按钮</sn-button>
    <sn-button variant="success">成功按钮</sn-button>
    <sn-button variant="warning">警告按钮</sn-button>
    <sn-button variant="danger">危险按钮</sn-button>
    <sn-button>默认按钮</sn-button>
    <sn-button variant="primary">主要按钮</sn-button>
    <sn-button variant="success">成功按钮</sn-button>
    <sn-button variant="warning">警告按钮</sn-button>
    <sn-button variant="danger">危险按钮</sn-button>
</template>
</exhibition-card>

<!-- 又一个二级标题 -->
## 文字按钮

<!-- 仿照上述内容编写即可 -->
仿照上述内容编写即可