# Dropdown 下拉菜单

## 基础用法

默认插槽为触发下拉菜单的元素/组件，通过`dropdown`插槽与`DropdownMenu`以及`DropdownMenuItem`组件一同使用得到下拉菜单。

:::demo

dropdown/basic

:::

## 禁用选项

为`DropdownMenuItem`添加`disabled`属性可以禁用该项菜单。

:::demo

dropdown/disabled

:::

## 自定义图标

为`DropdownMenuItem`指定`icon`属性可在其文字前添加图标，图标支持`Icon`组件中的所有图标。

:::demo

dropdown/icon

:::

## 分隔按钮

为`Dropdown`添加`splitButton`属性可以将传入默认插槽的文本以按钮组的形式展示。

:::demo

dropdown/split-button

:::

## 分隔选项

给`DropdownMenuItem`添加`divided`属性就会在其前面添加一个分隔符。

:::demo

dropdown/divided

:::

## 手动打开/关闭

`Dropdown`实例暴露了`open`、`close`、`toggle`方法用于切换打开/关闭状态。

:::demo

dropdown/exposed

:::
