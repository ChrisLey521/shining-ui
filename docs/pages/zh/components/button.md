# Button 按钮

## 基础用法

通过`variant`, `round`, `circle`, `plain`等来定义不同的按钮样式，

:::demo

button/basic

:::

## 按钮大小

`size`参数决定了按钮大小，默认为中等大小的按钮。

:::demo

button/size

:::

## 禁用

通过`disabled`参数来禁用按钮。

:::demo

button/disabled

:::

## 链接按钮

链接按钮没有背景颜色。添加`link`参数即可得到链接按钮。

:::demo

button/link

:::

## 幽灵按钮

添加`ghost`参数可得到幽灵按钮。幽灵按钮平时没有背景颜色，当鼠标悬停时出现淡淡的背景颜色。也可以通过添加`bg`参数使得背景颜色始终出现。

:::demo

button/ghost

:::

## 图标按钮

可以通过按钮的`icon`参数来传入图标名称，支持`Icon`组件内的所有图标。或者在默认插槽中使用`Icon`组件以及任意自定义图标内容。

:::demo

button/icon

:::

## loading 状态

通过`loading`参数来控制按钮的加载状态。使用`loadingIcon`参数进行自定义`loading`图标，`loadingText`自定义`loading`期间的按钮文字。

:::demo

button/loading

:::

## 自定义按钮颜色

:::demo

button/custom

:::

## 自定义按钮标签

:::demo

button/tag

:::

## 按钮组

将一组按钮放在一起。

:::demo

button/group

:::

## API List

### Attrs

|Name           |Description                                        |Type                                                                  |Default   |
|---------------|--------------------------------------------------|----------------------------------------------------------------------|-----------|
|variant        |按钮变体                                           |^[enum]`'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' `|`'default'`|
|size           |按钮尺寸                                           |^[enum]`'large' \| 'medium' \| 'small' \| 'mini' `                    |`'medium'` |
|plain          |是否朴素按钮                                       |`boolean`                                                             |`false`     |
|ghost          |是否幽灵按钮                                       |`boolean`                                                             |`false`     |
|bg             |幽灵按钮背景是否始终显示，仅当`ghost`为`true`时有效  |`boolean`                                                              |`false`    |
|link           |是否连接按钮                                       |`boolean`                                                             |`false`     |
|round          |是否圆边按钮                                       |`boolean`                                                             |`false`     |
|circle         |是否圆形按钮                                       |`boolean`                                                             |`false`     |
|loading        |按钮是否处于加载中状态                              |`boolean`                                                             |`false`     |
|loading-icon   |自定义加载中图标                                   |^[enum]`Icon, 组件的各个图标名称，支持所有的Icon组件`                     |`'loading'`|
|loading-text   |自定义加载中文案                                   |`string`                                                               |-          |
|disabled       |按钮是否被禁用                                     |`boolean`                                                              |`false`    |
|icon           |按钮的图标, 出现在默认插槽内容的左侧                 |^[enum]`Icon, 组件的各个图标名称，支持所有的Icon组件`                     |-          |
|type           |原生图标的`type`属性                               |^[enum]`'button' \| 'submit' \| 'reset'`                               |`'button`  |
|dark           |是否暗色调主题                                     |`boolean`                                                              |`false`    |
|tag            |按钮的`html`标签                                   |`string`                                                               |`'button'` |
|color          |自定义按钮的文字颜色                                |`string`                                                               |-         |
|border         |自定义按钮的边框颜色                                |`string`                                                               |-         |
|background     |自定义按钮的背景颜色                                |`string`                                                               |-         |
