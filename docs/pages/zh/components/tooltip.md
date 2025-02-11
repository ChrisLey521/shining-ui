# Tooltip 提示

## 指令用法

通过`v-tooltip`指令来使用tooltip。参数基本与`tooltip`组件相同。由于指令中难以通过插槽来自定义内容，因而添加了参数`contentAsComponent`。当`contentAsComponent`为`true`时，`content`将被作为`Vue`组件对待，此时可以将`content`的值以`Vue`组件或`h()`函数的返回值传入，从而实现类似插槽的自定义内容。

:::demo

tooltip/directive

:::
