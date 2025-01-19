# Button 按钮

## 基础用法
通过`variant`, `round`, `circle`, `plain`等来定义不同的按钮样式，

<exhibition-card :columns="5">
<!-- 这里需要空一格 -->

```js-vue
<template>
    <sn-button>默认按钮</sn-button>
    <sn-button variant="primary">主要按钮</sn-button>
    <sn-button variant="success">成功按钮</sn-button>
    <sn-button variant="warning">警告按钮</sn-button>
    <sn-button variant="danger">危险按钮</sn-button>
</template>
```
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