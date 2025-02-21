# InputTag 标签输入框

## 基础用法

:::demo

input-tag/basic

:::

## 自定义触发键

通过`trigger-key`参数指定触发键。支持空格键`space`和回车键`enter`。

:::demo

input-tag/trigger-key

:::

## 最大标签数

通过`max`参数指定最大可输入的标签数，超过该值则无法继续输入。

:::demo

input-tag/max

:::

## 最大展示标签数

通过`max-displayed-count`指定最大展示标签数。只会展示指定数量的标签，超过该数量的标签将会以`+n`的方式展示，鼠标悬停`+n`可触发`<Overlay></Overlay>`查看剩余标签。

:::demo

input-tag/max-displayed-count

:::

## 禁用状态

通过`disabled`参数控制是否禁用。

:::demo

input-tag/disabled

:::

## 一键清空

通过`clearable`参数支持一键清空。

:::demo

input-tag/clearable

:::

## 支持拖放排序

通过`draggable`参数支持拖放排序。

:::demo

input-tag/draggable

:::

## 尺寸

通过`size`参数改变尺寸。

:::demo

input-tag/size

:::

## 标签样式

通过`variant`参数改变标签样式。

:::demo

input-tag/variant

:::

## 自定义标签

通过`#tag`插槽来自定义标签。

:::demo

input-tag/custom-tag

:::

## 自定义前缀与后缀

通过`#prepend`插槽和`#append`插槽来自定义前缀/后缀。

:::demo

input-tag/slot

:::
