# Input 输入框

## 基础用法

:::demo

input/basic

:::

## 禁用状态

通过`disabled`参数来控制禁用状态, 默认为`false`。

:::demo

input/disabled

:::

## 一键清空

通过`clearabled`来支持一键清空。

:::demo

input/clearable

:::

## 格式化

通过`formatter`来格式化输入框内容, 同时可以使用`parser`来解析内容。

:::demo

input/formatter

:::

## 密码输入框

指定`type = 'password'`可以得到一个密码输入框。

:::demo

input/password

:::

## 带图标的输入框

通过`prefixIcon`和`suffixIcon`属性可以得到具有前后图标的输入框，也可以通过`#prepend`和`#append`插槽来添加前后图标。当使用了`#prepend`插槽时，`prefixIcon`属性将不再生效。`suffixIcon`属性和`#append`插槽同理。

:::demo

input/icon

:::

## 尺寸

通过`size`属性来指定输入框的尺寸，默认为`medium`。

:::demo

input/size

:::

## 输入长度限制

通过`minlength`和`maxlength`属性来限制最小/最大输入长度。可以使用`showWordCount`参数来控制是否显示输入长度限制。

:::demo

input/length

:::
